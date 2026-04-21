"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ComponentType, useRef } from "react";

import { cn } from "@/utils/cn";

import VivinhoLogo from "../../../public/assets/vivinho.svg";
import ExperienceCard, { ExperienceData } from "../cards/ExperienceCard";
import DockerLogo from "../logos/DockerLogo";
import NestLogo from "../logos/NestLogo";
import NextLogo from "../logos/NextLogo";
import NodeLogo from "../logos/NodeLogo";
import ReactLogo from "../logos/ReactLogo";
import TypescriptLogo from "../logos/TypescriptLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

type ExperienceConfig = {
  key: string;
  logo: ExperienceData["logo"];
  startDate: string;
  endDate: string | "present";
  tech: ComponentType<{ className?: string }>[];
  current?: boolean;
};

const experienceConfig: ExperienceConfig[] = [
  {
    key: "dotcodeSenior",
    logo: VivinhoLogo,
    startDate: "2025-10",
    endDate: "present",
    tech: [ReactLogo, NextLogo, TypescriptLogo, DockerLogo],
    current: true,
  },
  {
    key: "vivo",
    logo: VivinhoLogo,
    startDate: "2025-02",
    endDate: "2025-09",
    tech: [ReactLogo, NextLogo, TypescriptLogo, NodeLogo, NestLogo, DockerLogo],
  },
  {
    key: "dotcodeFrontend",
    logo: VivinhoLogo,
    startDate: "2023-06",
    endDate: "2025-01",
    tech: [ReactLogo, TypescriptLogo, DockerLogo],
  },
  {
    key: "gbAgritech",
    logo: VivinhoLogo,
    startDate: "2022-06",
    endDate: "2023-05",
    tech: [NextLogo, ReactLogo, TypescriptLogo],
  },
  {
    key: "vyaDigital",
    logo: VivinhoLogo,
    startDate: "2021-01",
    endDate: "2022-10",
    tech: [ReactLogo, TypescriptLogo, NodeLogo],
  },
];

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const section = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const titleText = t("title");

  const experiences: ExperienceData[] = experienceConfig.map((exp, i, arr) => ({
    logo: exp.logo,
    role: t(`items.${exp.key}.role`),
    company: t(`items.${exp.key}.company`),
    location: t(`items.${exp.key}.location`),
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: t(`items.${exp.key}.description`),
    points: t.raw(`items.${exp.key}.points`) as string[],
    tech: exp.tech,
    current: exp.current,
    showYear:
      i === 0 ||
      exp.startDate.split("-")[0] !== arr[i - 1].startDate.split("-")[0],
  }));

  useGSAP(
    () => {
      if (!section.current || !title.current) return;

      gsap.set(title.current, {
        scrambleText: { chars, text: "Tir0w9ksdlfm" },
      });

      const cards = section.current.querySelectorAll(".exp-card");
      const years = section.current.querySelectorAll(".exp-year");
      const spines = section.current.querySelectorAll(".exp-spine");
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.set(years, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(spines, isDesktop ? { scaleX: 0 } : { scaleY: 0 });

      const sectionIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const tl = gsap.timeline();

            tl.to(title.current, {
              duration: 0.9,
              scrambleText: { chars, text: titleText },
            });

            tl.to(
              spines,
              {
                ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
                duration: 0.9,
                ease: "power2.out",
              },
              "-=0.6",
            );

            tl.to(
              years,
              {
                clipPath: "inset(0 0% 0 0)",
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.6",
            );

            sectionIo.disconnect();
          });
        },
        { threshold: 0.15 },
      );

      sectionIo.observe(section.current);

      const cardTriggers: ScrollTrigger[] = [];

      const frame = requestAnimationFrame(() => {
        const horizontalTween = isDesktop
          ? (gsap.getById("horizontalScroll") as gsap.core.Tween | undefined)
          : undefined;

        cards.forEach((card) => {
          const tween = gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: isDesktop ? "left 95%" : "top 95%",
                end: isDesktop ? "left 85%" : "top 85%",
                scrub: 0.2,
                snap: {
                  snapTo: [0, 1],
                  duration: { min: 0.12, max: 0.28 },
                  ease: "power1.out",
                },
                invalidateOnRefresh: true,
              },
            },
          );
          if (tween.scrollTrigger) cardTriggers.push(tween.scrollTrigger);
        });
      });

      return () => {
        cancelAnimationFrame(frame);
        sectionIo.disconnect();
        cardTriggers.forEach((t) => t.kill());
      };
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className={cn(
        "panel relative flex z-10 pt-16 pb-20",
        "max-md:w-full max-md:px-4",
        "md:w-fit md:h-screen md:pr-[10vw]",
      )}
    >
      <div className="flex flex-col max-md:w-full md:w-fit">
        <div className="flex items-baseline gap-4 mb-10">
          <h2
            ref={title}
            className="font-bold text-txt text-4xl scramble-text w-fit"
          >
            {titleText}
          </h2>
          <span className="font-mono text-xs text-foreground-muted/60 uppercase tracking-[0.2em]">
            {t("rolesLabel", {
              count: String(experiences.length).padStart(2, "0"),
            })}
          </span>
        </div>

        <div className={cn("relative", "max-md:pl-10", "md:flex-1")}>
          <div
            className={cn(
              "exp-spine hidden md:block absolute pointer-events-none",
              "top-[1.875rem] left-0 right-0 h-px",
              "bg-gradient-to-r from-foreground-muted/30 via-foreground-muted/25 to-transparent",
              "origin-left",
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              "exp-spine md:hidden absolute pointer-events-none",
              "top-2 bottom-2 left-5 w-px",
              "bg-gradient-to-b from-foreground-muted/30 via-foreground-muted/20 to-transparent",
              "origin-top",
            )}
            aria-hidden="true"
          />

          <div
            className={cn(
              "flex",
              "max-md:flex-col max-md:w-full max-md:gap-10",
              "md:gap-12",
            )}
          >
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} data={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
