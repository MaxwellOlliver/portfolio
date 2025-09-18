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
  const projects = [
    {
      title: "Moonly",
      description:
        "Moonly is a web app that shows a song's lyrics synchronized with the music.",
      image: "/assets/moonly.jpg",
      link: "https://www.google.com",
      backgroundColor: "#da7727",
      id: "moonly",
      tools: [ReactLogo, TypescriptLogo],
    },
    {
      title: "InPro",
      description:
        "A platform where you can expose your gaming skills to get higher chances on getting noticed by professional teams.",
      image: "/assets/inpro.jpg",
      link: "https://www.google.com",
      backgroundColor: "#781188",
      id: "inpro",
      tools: [ReactLogo, TypescriptLogo, NestLogo, PrismaLogo],
    },
    {
      title: "Small Projects",
      description: "A collection of small projects I've worked on.",
      image: "/assets/others.jpg",
      link: "https://www.google.com",
      backgroundColor: "#010409",
      id: "others",
      tools: [ReactLogo, TypescriptLogo, NestLogo, PrismaLogo],
    },
  ];

  useGSAP(() => {
    gsap.set(
      projects.map((project) => `#${project.id}`),
      {
        opacity: 0,
        y: 20,
      }
    );

    gsap.to(
      projects.map((project) => `#${project.id}`),
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".project-list",
          start: "top bottom",
          end: "top center",
        },
      }
    );
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
