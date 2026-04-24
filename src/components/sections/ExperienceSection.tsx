"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { experiencesConfig } from "@/data/experiences";
import { cn } from "@/utils/cn";
import { SCRAMBLE_CHARS } from "@/utils/scramble";

import ExperienceCard, { type ExperienceData } from "../cards/ExperienceCard";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const DESKTOP_QUERY = "(min-width: 768px)";

export default function ExperienceSection() {
  const t = useTranslations("experience");
  const section = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const titleText = t("title");

  const experiences: ExperienceData[] = experiencesConfig.map((exp, i, arr) => ({
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
        scrambleText: { chars: SCRAMBLE_CHARS, text: "Tir0w9ksdlfm" },
      });

      const cards = section.current.querySelectorAll(".exp-card");
      const years = section.current.querySelectorAll(".exp-year");
      const spines = section.current.querySelectorAll(".exp-spine");
      const mm = gsap.matchMedia();

      gsap.set(years, { clipPath: "inset(0 100% 0 0)" });

      const runIntroTimeline = (isDesktop: boolean) => {
        const tl = gsap.timeline();
        tl.to(title.current, {
          duration: 0.9,
          scrambleText: { chars: SCRAMBLE_CHARS, text: titleText },
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
        return tl;
      };

      const isDesktopAtMount = window.matchMedia(DESKTOP_QUERY).matches;
      const sectionIo = isDesktopAtMount
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                runIntroTimeline(true);
                sectionIo?.disconnect();
              });
            },
            { threshold: 0.15 },
          )
        : null;

      if (sectionIo) sectionIo.observe(section.current);

      const titleIntroTrigger = !isDesktopAtMount
        ? ScrollTrigger.create({
            trigger: title.current,
            start: "top 90%",
            once: true,
            onEnter: () => runIntroTimeline(false),
          })
        : null;

      let frame = 0;
      mm.add(
        {
          isDesktop: DESKTOP_QUERY,
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const isDesktop = context.conditions?.isDesktop ?? false;
          gsap.set(spines, isDesktop ? { scaleX: 0 } : { scaleY: 0 });
          gsap.set(
            cards,
            isDesktop ? { opacity: 0, y: 24 } : { opacity: 0, x: 40 },
          );

          frame = requestAnimationFrame(() => {
            const horizontalTween = isDesktop
              ? (gsap.getById("horizontalScroll") as
                  | gsap.core.Tween
                  | undefined)
              : undefined;

            cards.forEach((card) => {
              gsap.fromTo(
                card,
                isDesktop ? { opacity: 0, y: 24 } : { opacity: 0, x: 40 },
                {
                  opacity: 1,
                  ...(isDesktop ? { y: 0 } : { x: 0 }),
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: horizontalTween,
                    start: isDesktop ? "left 95%" : "top 90%",
                    end: isDesktop ? "left 75%" : "top 60%",
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
            });
          });

          return () => cancelAnimationFrame(frame);
        },
      );

      return () => {
        sectionIo?.disconnect();
        titleIntroTrigger?.kill();
        cancelAnimationFrame(frame);
        mm.revert();
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
        "md:w-fit md:h-full md:min-h-0 md:pr-[10vw]",
      )}
    >
      <div className="flex flex-col max-md:w-full md:w-fit md:h-full md:min-h-0">
        <div className="flex items-baseline gap-4 mb-10 shrink-0">
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

        <div className={cn("relative", "max-md:pl-10", "md:flex-1 md:min-h-0")}>
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
              "md:gap-12 md:h-full md:min-h-0",
            )}
          >
            {experiences.map((exp) => (
              <ExperienceCard
                key={`${exp.company}-${exp.startDate}`}
                data={exp}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
