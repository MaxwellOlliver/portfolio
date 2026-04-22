"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { type ComponentType, useRef } from "react";

import { cn } from "@/utils/cn";
import { SCRAMBLE_CHARS } from "@/utils/scramble";

import ProjectCard from "../cards/ProjectCard";
import NestLogo from "../logos/NestLogo";
import PrismaLogo from "../logos/PrismaLogo";
import ReactLogo from "../logos/ReactLogo";
import TypescriptLogo from "../logos/TypescriptLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

type ProjectConfig = {
  key: "moonly" | "inpro" | "others";
  image: string;
  githubLink?: string;
  websiteLink?: string;
  backgroundColor: string;
  tools: ComponentType<{ className?: string }>[];
};

const projectsConfig: ProjectConfig[] = [
  {
    key: "moonly",
    image: "/assets/moonly.jpg",
    githubLink: "https://github.com/MaxwellOlliver/moonly",
    websiteLink: "https://maxwellolliver.github.io/moonly/",
    backgroundColor: "#da7727",
    tools: [ReactLogo, TypescriptLogo],
  },
  {
    key: "inpro",
    image: "/assets/inpro.jpg",
    githubLink: "https://www.google.com",
    websiteLink: "https://www.google.com",
    backgroundColor: "#781188",
    tools: [ReactLogo, TypescriptLogo, NestLogo, PrismaLogo],
  },
  {
    key: "others",
    image: "/assets/others.jpg",
    githubLink: "https://www.google.com",
    websiteLink: "https://www.google.com",
    backgroundColor: "#4300A1",
    tools: [ReactLogo, TypescriptLogo, NestLogo, PrismaLogo],
  },
];

export default function ProjectsSection() {
  const t = useTranslations("projects");
  const title = useRef<HTMLHeadingElement>(null);
  const titleText = t("title");

  useGSAP(() => {
    gsap.set(title.current, {
      scrambleText: { chars: SCRAMBLE_CHARS, text: "Pk3nsaK9as" },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: { chars: SCRAMBLE_CHARS, text: titleText },
      scrollTrigger: {
        trigger: title.current,
        start: "top 90%",
      },
    });

    const items = gsap.utils.toArray<HTMLElement>(".project-card");

    items.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 78%",
            scrub: 0.8,
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

  return (
    <section
      className="relative w-full min-h-dvh overflow-x-clip pt-8 pb-16"
      id="projects"
    >
      <div
        className={cn(
          "h-[75px] w-[550px] rounded-full",
          "bg-gradient-to-r from-off-primary/40 via-primary/40 to-off-primary/40",
          "supports-firefox:from-off-primary/[0.07] supports-firefox:to-off-primary/[0.07] supports-firefox:h-[200px]",
          "absolute -top-0 left-1/2 blur-[100px] translate-x-1/2  rotate-180 origin-left",
          "z-[1] pointer-events-none",
          "max-md:top-[5%]",
        )}
      />
      <div className="layout flex flex-col">
        <div className="flex items-baseline gap-4 mb-6">
          <h2
            ref={title}
            className="font-bold text-txt text-4xl scramble-text w-fit"
          >
            {titleText}
          </h2>
          <span className="font-mono text-xs text-foreground-muted/60 uppercase tracking-[0.2em]">
            {t("count", {
              count: String(projectsConfig.length).padStart(2, "0"),
            })}
          </span>
        </div>
        <p className="text-foreground-muted max-w-[40rem] mb-12 text-sm leading-relaxed">
          {t("description")}
        </p>
        <div className="project-list flex flex-col w-full gap-4">
          {projectsConfig.map((project, i) => (
            <ProjectCard
              key={project.key}
              id={project.key}
              title={t(`items.${project.key}.title`)}
              description={t(`items.${project.key}.description`)}
              image={project.image}
              githubLink={project.githubLink}
              websiteLink={project.websiteLink}
              backgroundColor={project.backgroundColor}
              tools={project.tools}
              index={i}
              total={projectsConfig.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
