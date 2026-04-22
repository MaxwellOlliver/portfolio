"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Linkedin, Mail, MoveUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { glassCard, primaryCard } from "@/utils/cardStyles";
import { cn } from "@/utils/cn";
import { randomScramble, SCRAMBLE_CHARS } from "@/utils/scramble";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/MaxwellOlliver",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/maxwell-macedo",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:maxwellmacedo2015@gmail.com",
    icon: Mail,
  },
];

const siteLinks = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about-me" },
  { key: "projects", href: "#projects" },
] as const;

export default function FooterSection() {
  const t = useTranslations("footer");
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".footer-reveal");
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
        },
      });

      if (!title.current) return;

      const titleEl = title.current;
      const lockedHeight = titleEl.offsetHeight;
      const lockedWidth = titleEl.offsetWidth;

      const wordEntries: { span: HTMLSpanElement; text: string }[] = [];

      const appendWords = (text: string, container: Node) => {
        text.split(/(\s+)/).forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            container.appendChild(document.createTextNode(token));
            return;
          }
          const span = document.createElement("span");
          span.textContent = randomScramble(token.length);
          container.appendChild(span);
          wordEntries.push({ span, text: token });
        });
      };

      const originalChildren = Array.from(titleEl.childNodes);
      titleEl.textContent = "";
      originalChildren.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent) {
          appendWords(node.textContent, titleEl);
        } else if (node instanceof HTMLElement) {
          const text = node.textContent ?? "";
          node.textContent = "";
          appendWords(text, node);
          titleEl.appendChild(node);
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          onEnter: () => {
            titleEl.style.height = `${lockedHeight}px`;
            titleEl.style.width = `${lockedWidth}px`;
            titleEl.style.overflow = "hidden";
          },
        },
      });

      wordEntries.forEach(({ span, text }, i) => {
        tl.to(
          span,
          {
            duration: 0.8,
            ease: "power2.out",
            scrambleText: { chars: SCRAMBLE_CHARS, text },
            ...(i === wordEntries.length - 1
              ? {
                  onComplete: () => {
                    titleEl.style.height = "";
                    titleEl.style.width = "";
                    titleEl.style.overflow = "";
                  },
                }
              : {}),
          },
          "<",
        );
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative w-full pt-16 pb-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="layout flex flex-col gap-10">
        <div className="footer-reveal flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
            {t("eyebrow")}
          </span>
          <h2
            ref={title}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl wrap-break-word"
          >
            {t.rich("headline", {
              emphasis: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h2>
          <p className="text-foreground-muted max-w-xl">{t("description")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <a
            href="mailto:maxwellmacedo2015@gmail.com"
            data-blobity="true"
            data-blobity-magnetic="false"
            data-blobity-radius="16"
            className={cn(
              primaryCard,
              "footer-reveal group p-6 flex flex-col gap-4 justify-between min-h-44",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-background/60">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-background/60 animate-ping" />
                <span className="relative rounded-full w-2 h-2 bg-background" />
              </span>
              {t("status")}
            </div>
            <div className="relative flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-background/50">
                  {t("dropALine")}
                </span>
                <span className="text-xl font-medium break-all">
                  maxwellmacedo2015@gmail.com
                </span>
              </div>
              <ArrowUpRight className="w-6 h-6 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </a>

          <div
            className={cn(
              glassCard,
              "footer-reveal p-6 flex flex-col gap-4 min-h-44",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
              aria-hidden="true"
            />
            <h3 className="relative text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              {t("sitemap")}
            </h3>
            <ul className="relative flex flex-col gap-2 text-sm">
              {siteLinks.map((link) => (
                <li key={link.href} data-no-blobity>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                    data-blobity="true"
                    data-blobity-magnetic="false"
                  >
                    {t(`links.${link.key}`)}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              glassCard,
              "footer-reveal p-6 flex flex-col gap-4 min-h-44",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
              aria-hidden="true"
            />
            <h3 className="relative text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              {t("elsewhere")}
            </h3>
            <ul className="relative flex flex-col gap-2 text-sm">
              {socials.map((social) => (
                <li key={social.href} data-no-blobity>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                    data-blobity="true"
                    data-blobity-magnetic="false"
                  >
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-reveal flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-1 text-xs text-foreground-muted">
            <span className="font-mono">
              {t("copyright", { year: new Date().getFullYear() })}
            </span>
            <span>{t("craftedWith")}</span>
          </div>
          <a
            href="#home"
            data-blobity="true"
            data-blobity-magnetic="false"
            data-blobity-radius="12"
            className={cn(
              "group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden",
              "border border-white/10 bg-white/3 backdrop-blur-sm text-sm",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-white/4 via-transparent to-transparent"
              aria-hidden="true"
            />
            <MoveUp className="relative w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="relative">{t("backToTop")}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
