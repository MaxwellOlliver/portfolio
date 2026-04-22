"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText } from "gsap/all";
import {
  ArrowDown,
  ChevronDown,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import OrbitingTech from "../layout/OrbitingTech";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../ui/Dropdown";

const resumeFiles = [
  {
    locale: "en",
    href: "/resume/maxwell-macedo-en.pdf",
    fileName: "maxwell-macedo-en.pdf",
  },
  {
    locale: "pt",
    href: "/resume/maxwell-macedo-pt.pdf",
    fileName: "maxwell-macedo-pt.pdf",
  },
] as const;

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, SplitText);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function HomeSection() {
  const t = useTranslations("home");

  const links = [
    {
      href: "https://github.com/MaxwellOlliver",
      icon: Github,
    },
    {
      href: "https://linkedin.com/in/maxwell-macedo",
      icon: Linkedin,
    },
    {
      href: "mailto:maxwellmacedo2015@gmail.com",
      icon: Mail,
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0,
    });

    tl.from("#status-chip", {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
    });

    const titleEl = document.querySelector<HTMLElement>("#title");
    if (titleEl) {
      const finalText = titleEl.textContent ?? "";
      const lockedHeight = titleEl.offsetHeight;
      const lockedWidth = titleEl.offsetWidth;

      titleEl.style.height = `${lockedHeight}px`;
      titleEl.style.width = `${lockedWidth}px`;
      titleEl.style.overflow = "hidden";

      const words = finalText.split(" ");
      titleEl.textContent = "";
      const wordSpans: HTMLSpanElement[] = [];
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.textContent = Array.from(word)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("");
        titleEl.appendChild(span);
        wordSpans.push(span);
        if (i < words.length - 1) {
          titleEl.appendChild(document.createTextNode(" "));
        }
      });

      wordSpans.forEach((span, i) => {
        tl.to(
          span,
          {
            duration: 0.8,
            ease: "power2.out",
            scrambleText: { chars, text: words[i] },
            ...(i === wordSpans.length - 1
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
    }

    const descriptionEl = document.querySelector<HTMLElement>("#description");
    if (descriptionEl) {
      const descriptionSplit = new SplitText(descriptionEl, { type: "words" });
      tl.from(
        descriptionSplit.words,
        {
          opacity: 0,
          y: 20,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        "<",
      );
    }

    tl.from(
      "#eyebrow",
      {
        opacity: 0,
        y: -20,
        ease: "power2.inOut",
      },
      ">",
    );

    const socialLinks = gsap.utils.toArray(".social-link");
    tl.from(socialLinks, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    tl.from(
      "#home-ctas > *",
      {
        opacity: 0,
        y: 20,
        ease: "power2.inOut",
        stagger: 0.08,
      },
      "<",
    );
  });

  return (
    <section className="relative w-full min-h-dvh overflow-visible" id="home">
      {/* <div className="absolute inset-0 select-none h-full">
        <div
          className={cn(
            "h-[75px] w-[850px] rounded-full",
            "bg-gradient-to-r from-off-primary/40 via-primary/40 to-off-primary/40",
            "supports-firefox:from-off-primary/[0.07] supports-firefox:to-off-primary/[0.07] supports-firefox:h-[200px]",
            "absolute top-[20%] left-[95%] blur-[130px] -translate-y-1/2  rotate-180 origin-left",
            "z-[1] pointer-events-none",
            "max-md:top-[5%]",
          )}
        ></div>

        <div
          className={cn(
            "h-[160px] w-[850px] rounded-full",
            "bg-gradient-to-r from-off-primary/20 via-primary/20 to-off-primary/20",
            "supports-firefox:from-off-primary/[0.07] supports-firefox:to-off-primary/[0.07] supports-firefox:h-[200px]",
            "absolute top-[80%] left-[65%] blur-[130px] -translate-y-1/2 -translate-x-1/2 rotate-180 origin-left",
            "z-[1] pointer-events-none",
            "max-md:top-[5%]",
          )}
        ></div>
      </div> */}
      <div className="layout mt-16 flex items-center justify-center min-h-[calc(100dvh-10rem)] relative w-full">
        <OrbitingTech />
        <div className="flex flex-col items-center max-w-120 z-10">
          <div
            id="status-chip"
            className={cn(
              "relative flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full overflow-hidden",
              "border border-white/10 bg-white/3 backdrop-blur-sm",
              "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/4 via-transparent to-transparent"
              aria-hidden="true"
            />
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" />
              <span className="relative rounded-full w-2 h-2 bg-primary" />
            </span>
            <span className="relative text-xs uppercase tracking-[0.2em] text-foreground-muted">
              {t("status")}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            {links.map((link) => (
              <a
                href={link.href}
                target="_blank"
                className="social-link size-8 flex items-center justify-center rounded-full"
                rel="noopener noreferrer"
                key={link.href}
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <link.icon className="w-5 h-5 text-foreground-muted" />
              </a>
            ))}
          </div>
          <span
            id="eyebrow"
            className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3"
          >
            {t("eyebrow")}
          </span>
          <h1 className="font-bold text-center text-7xl" id="title">
            {t("title")}
          </h1>
          <p
            className="mt-4 text-lg text-center text-foreground-muted"
            id="description"
          >
            {t("description")}
          </p>
          <div
            id="home-ctas"
            className="flex items-center gap-3 mt-4 flex-wrap justify-center"
          >
            <a
              id="more-about-me"
              href="#about-me"
              className={cn(
                "relative flex items-center gap-2 p-4 rounded-xl w-fit overflow-hidden",
                "border border-white/10 bg-white/3 backdrop-blur-sm",
                "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]",
              )}
              data-blobity="true"
              data-blobity-magnetic="false"
              data-blobity-offset-y="0"
              data-blobity-offset-x="0"
              data-blobity-radius="12"
            >
              <span
                className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-white/4 via-transparent to-transparent"
                aria-hidden="true"
              />
              <ArrowDown className="w-5 h-5 relative" />
              <span className="relative">{t("moreAboutMe")}</span>
            </a>
            <Dropdown>
              <DropdownTrigger>
                {({ isOpen, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    className={cn(
                      "relative flex items-center gap-2 p-4 rounded-xl w-fit overflow-hidden cursor-pointer",
                      "bg-primary text-background",
                      "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_20px_-8px_rgba(0,0,0,0.4)]",
                    )}
                    data-blobity="true"
                    data-blobity-magnetic="false"
                    data-blobity-radius="12"
                    data-blobity-offset-y="0"
                    data-blobity-offset-x="0"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-white/15 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <FileDown className="w-5 h-5 relative" />
                    <span className="relative">{t("resume.label")}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 relative transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                )}
              </DropdownTrigger>
              <DropdownMenu>
                <span className="block px-3 pt-1 pb-2 text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                  {t("resume.hint")}
                </span>
                {resumeFiles.map((file) => (
                  <DropdownItem
                    key={file.locale}
                    href={file.href}
                    download={file.fileName}
                  >
                    <FileDown className="w-4 h-4 text-foreground-muted" />
                    <span>{t(`resume.${file.locale}`)}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* <HomeBackground /> */}
    </section>
  );
}
