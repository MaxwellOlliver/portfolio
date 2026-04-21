"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import HomeBackground from "../layout/HomeBackground";
import OrbitingTech from "../layout/OrbitingTech";

gsap.registerPlugin(useGSAP, SplitText);

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

    const links = gsap.utils.toArray(".social-link");
    tl.from(links, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    tl.from("#eyebrow", {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
    });

    const title = document.querySelector("#title");

    const split = new SplitText(title, {
      type: "words",
    });
    tl.from(split.words, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    const description = document.querySelector("#description");
    const split2 = new SplitText(description, {
      type: "words",
    });
    tl.from(split2.words, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    const moreAboutMe = document.querySelector("#more-about-me");
    tl.from(moreAboutMe, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.05,
    });
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
      <div className="layout flex items-center justify-center min-h-[calc(100dvh-10rem)] relative w-full">
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
          <a
            id="more-about-me"
            href="#about-me"
            className={cn(
              "relative flex items-center gap-2 mt-4 p-4 rounded-xl w-fit overflow-hidden",
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
        </div>
      </div>
      {/* <HomeBackground /> */}
    </section>
  );
}
