"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import {
  ArrowDown,
  ChevronDown,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { cn } from "@/utils/cn";

import OrbitingTech from "../layout/OrbitingTech";
import Dropdown from "../ui/dropdown/Dropdown";
import DropdownItem from "../ui/dropdown/DropdownItem";
import DropdownMenu from "../ui/dropdown/DropdownMenu";
import DropdownTrigger from "../ui/dropdown/DropdownTrigger";

gsap.registerPlugin(useGSAP, SplitText);

const RESUME_BASE = "https://files.maxwellmacedo.com";

const resumeFiles = [
  {
    locale: "en",
    href: `${RESUME_BASE}/maxwell_macedo_cv_en.pdf`,
    fileName: "maxwell_macedo_cv_en.pdf",
  },
  {
    locale: "pt",
    href: `${RESUME_BASE}/maxwell_macedo_cv_pt.pdf`,
    fileName: "maxwell_macedo_cv_pt.pdf",
  },
] as const;

const socialLinks = [
  { href: "https://github.com/MaxwellOlliver", icon: Github },
  { href: "https://linkedin.com/in/maxwell-macedo", icon: Linkedin },
  { href: "mailto:maxwellmacedo2015@gmail.com", icon: Mail },
] as const;

export default function HomeSection() {
  const t = useTranslations("home");
  const statusChipRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.45 },
    });

    if (titleRef.current) {
      const titleSplit = new SplitText(titleRef.current, {
        type: "words,chars",
      });
      tl.from(titleSplit.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.025,
      });
    }

    if (descriptionRef.current) {
      const descriptionSplit = new SplitText(descriptionRef.current, {
        type: "words",
      });
      tl.from(
        descriptionSplit.words,
        { opacity: 0, y: 16, stagger: 0.02 },
        "-=0.15",
      );
    }
    tl.from(eyebrowRef.current, { opacity: 0, y: -12 }, "<");

    const lastGroup: Element[] = [
      statusChipRef.current,
      ...(socialsRef.current ? Array.from(socialsRef.current.children) : []),
      ...(ctasRef.current ? Array.from(ctasRef.current.children) : []),
    ].filter((el): el is Element => el !== null);
    if (lastGroup.length) {
      tl.from(lastGroup, { opacity: 0, y: 12, stagger: 0.04 }, "-=0.15");
    }
  });

  return (
    <section className="relative w-full min-h-dvh overflow-visible" id="home">
      <div className="layout mt-16 flex items-center justify-center min-h-[calc(100dvh-10rem)] relative w-full">
        <OrbitingTech />
        <div className="flex flex-col items-center max-w-120 z-10">
          <div
            ref={statusChipRef}
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
              <span className="absolute inset-0 rounded-full bg-green-500/60 animate-ping" />
              <span className="relative rounded-full w-2 h-2 bg-green-500" />
            </span>
            <span className="relative text-xs uppercase tracking-[0.2em] text-foreground-muted">
              {t("status")}
            </span>
          </div>
          <div ref={socialsRef} className="flex items-center gap-4 mb-6">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                target="_blank"
                className="size-8 flex items-center justify-center rounded-full"
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
            ref={eyebrowRef}
            className="text-xs uppercase tracking-[0.2em] text-foreground-muted mb-3"
          >
            {t("eyebrow")}
          </span>
          <h1 ref={titleRef} className="font-bold text-center text-7xl">
            {t("title")}
          </h1>
          <p
            ref={descriptionRef}
            className="mt-4 text-lg text-center text-foreground-muted"
          >
            {t("description")}
          </p>
          <div
            ref={ctasRef}
            className="flex items-center gap-3 mt-4 flex-wrap justify-center"
          >
            <a
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
    </section>
  );
}
