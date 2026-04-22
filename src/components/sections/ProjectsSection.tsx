"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { cn } from "@/utils/cn";

import ProjectCard from "../cards/ProjectCard";
import NestLogo from "../logos/NestLogo";
import PrismaLogo from "../logos/PrismaLogo";
import ReactLogo from "../logos/ReactLogo";
import TypescriptLogo from "../logos/TypescriptLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function ProjectsSection() {
  const title = useRef<HTMLHeadingElement>(null);

  const projects: React.ComponentProps<typeof ProjectCard>[] = [
    {
      title: "Moonly",
      description:
        "Moonly is a web app that shows a song's lyrics synchronized with the music.",
      image: "/assets/moonly.jpg",
      githubLink: "https://github.com/MaxwellOlliver/moonly",
      websiteLink: "https://maxwellolliver.github.io/moonly/",
      backgroundColor: "#da7727",
      id: "moonly",
      tools: [ReactLogo, TypescriptLogo],
    },
    {
      title: "InPro",
      description:
        "A platform where you can expose your gaming skills to get higher chances on getting noticed by professional teams.",
      image: "/assets/inpro.jpg",
      githubLink: "https://www.google.com",
      websiteLink: "https://www.google.com",
      backgroundColor: "#781188",
      id: "inpro",
      tools: [ReactLogo, TypescriptLogo, NestLogo, PrismaLogo],
    },
    {
      title: "Small Projects",
      description: "A collection of small projects I've worked on.",
      image: "/assets/others.jpg",
      githubLink: "https://www.google.com",
      websiteLink: "https://www.google.com",
      backgroundColor: "#4300A1",
      id: "others",
      tools: [ReactLogo, TypescriptLogo, NestLogo, PrismaLogo],
    },
  ];

  useGSAP(() => {
    gsap.set(title.current, {
      scrambleText: { chars, text: "Pk3nsaK9as" },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: { chars, text: "Projects" },
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
            start: "center 95%",
            end: "center 80%",
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
      className="relative w-full min-h-dvh overflow-x-clip pt-8 pb-36"
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
      ></div>
      <div className="layout flex flex-col">
        <div className="flex items-baseline gap-4 mb-6">
          <h2
            ref={title}
            className="font-bold text-txt text-4xl scramble-text w-fit"
          >
            Projects
          </h2>
          <span className="font-mono text-xs text-foreground-muted/60 uppercase tracking-[0.2em]">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
        <p className="text-foreground-muted max-w-[40rem] mb-12 text-sm leading-relaxed">
          A mix of personal experiments and production work — case studies
          span motion-driven interfaces, full-stack platforms, and smaller
          one-offs I ship between bigger things.
        </p>
        <div className="project-list flex flex-col w-full gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              {...project}
              index={i}
              total={projects.length}
              key={project.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
