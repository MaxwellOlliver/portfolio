"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/utils/cn";

import Glassify from "../cards/Glassify";
import ProjectCard from "../cards/ProjectCard";
import NestLogo from "../logos/NestLogo";
import PrismaLogo from "../logos/PrismaLogo";
import ReactLogo from "../logos/ReactLogo";
import TypescriptLogo from "../logos/TypescriptLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectsSection() {
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
        }
      );
    });
  });

  return (
    <section
      className="relative w-full min-h-dvh overflow-visible pt-8 pb-36"
      id="projects"
    >
      <div
        className={cn(
          "h-[75px] w-[550px] rounded-full",
          "bg-gradient-to-r from-off-primary/40 via-primary/40 to-off-primary/40",
          "supports-firefox:from-off-primary/[0.07] supports-firefox:to-off-primary/[0.07] supports-firefox:h-[200px]",
          "absolute -top-0 left-1/2 blur-[100px] translate-x-1/2  rotate-180 origin-left",
          "z-[1] pointer-events-none",
          "max-md:top-[5%]"
        )}
      ></div>
      <div className="layout flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 mb-24 max-w-[40rem] px-12">
          <Glassify>
            <PanelsTopLeft className="w-6 h-6 text-primary" />
          </Glassify>
          <h2 className="text-4xl font-bold">Projects</h2>
          <p className="text-txt-secondary text-center">
            I&apos;ve worked on a variety of projects, from small personal
            projects to large-scale enterprise applications.
          </p>
        </div>
        <div className="project-list flex flex-col w-full gap-4 max-w-4xl">
          {projects.map((project) => (
            <ProjectCard {...project} key={project.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
