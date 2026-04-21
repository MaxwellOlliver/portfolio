"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { cn } from "@/utils/cn";

import VivinhoLogo from "../../../public/assets/vivinho.svg";
import ExperienceCard, { ExperienceData } from "../cards/ExperienceCard";
import DockerLogo from "../logos/DockerLogo";
import JavaLogo from "../logos/JavaLogo";
import NestLogo from "../logos/NestLogo";
import NextLogo from "../logos/NextLogo";
import NodeLogo from "../logos/NodeLogo";
import PrismaLogo from "../logos/PrismaLogo";
import ReactLogo from "../logos/ReactLogo";
import SpringBootLogo from "../logos/SpringBootLogo";
import TypescriptLogo from "../logos/TypescriptLogo";
import VueLogo from "../logos/VueLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const experiences: ExperienceData[] = [
  {
    logo: VivinhoLogo,
    role: "Full-Stack Developer",
    company: "Telefónica",
    location: "Remote",
    startDate: "2023-02",
    endDate: "present",
    description:
      "Leading motion-rich interface work for a customer-facing platform, bridging design and engineering.",
    points: [
      "Shipped a redesigned dashboard that cut task-completion time by 34%.",
      "Built a shared motion system in GSAP + React used across 12 teams.",
      "Migrated legacy services to a modular NestJS stack with zero downtime.",
    ],
    tech: [ReactLogo, NextLogo, TypescriptLogo, NestLogo, PrismaLogo, DockerLogo],
    current: true,
  },
  {
    logo: VivinhoLogo,
    role: "Backend Developer",
    company: "Previous Co.",
    location: "São Paulo",
    startDate: "2021-06",
    endDate: "2023-01",
    description:
      "Designed event-driven pipelines powering a fintech risk platform with millions of daily events.",
    points: [
      "Authored a Kafka → Postgres ingestion layer handling 4M events/day.",
      "Introduced contract tests across 9 services, halving integration incidents.",
    ],
    tech: [JavaLogo, SpringBootLogo, DockerLogo, NodeLogo],
  },
  {
    logo: VivinhoLogo,
    role: "Frontend Developer",
    company: "Earlier Co.",
    location: "Remote",
    startDate: "2020-01",
    endDate: "2021-05",
    description:
      "Built customer-facing Vue apps with a strong emphasis on accessibility and performance budgets.",
    points: [
      "Rebuilt the checkout flow — Lighthouse mobile score 62 → 94.",
      "Introduced a shared design-token pipeline between Figma and Vue.",
    ],
    tech: [VueLogo, TypescriptLogo, NodeLogo],
  },
  {
    logo: VivinhoLogo,
    role: "Junior Developer",
    company: "First Gig",
    location: "Remote",
    startDate: "2018-08",
    endDate: "2019-12",
    description:
      "First professional role — shipped internal tools and learned the craft alongside senior engineers.",
    points: [
      "Built an internal tool used by 40+ analysts daily.",
      "Paired on the migration from Angular to React.",
    ],
    tech: [ReactLogo, NodeLogo, NextLogo],
  },
];

export default function ExperienceSection() {
  const section = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

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

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const tl = gsap.timeline();

            tl.to(title.current, {
              duration: 0.9,
              scrambleText: { chars, text: "Experience" },
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

            tl.to(
              cards,
              {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: "power2.out",
              },
              "-=0.5",
            );

            io.disconnect();
          });
        },
        { threshold: 0.15 },
      );

      io.observe(section.current);

      return () => io.disconnect();
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
            Experience
          </h2>
          <span className="font-mono text-xs text-foreground-muted/60 uppercase tracking-[0.2em]">
            {String(experiences.length).padStart(2, "0")} roles
          </span>
        </div>

        <div
          className={cn(
            "relative",
            "max-md:pl-10",
            "md:flex-1",
          )}
        >
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
