import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/utils/cn";

import Glassify from "../cards/Glassify";
import ProjectCard from "../cards/ProjectCard";

export default function ProjectsSection() {
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
        <div className="flex flex-col items-center justify-center gap-4 mb-24 max-w-[40rem]">
          <Glassify>
            <PanelsTopLeft className="w-6 h-6 text-primary" />
          </Glassify>
          <h2 className="text-4xl font-bold">Projects</h2>
          <p className="text-txt-secondary text-center">
            I&apos;ve worked on a variety of projects, from small personal
            projects to large-scale enterprise applications.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center max-w-[64rem] w-full gap-4">
          <ProjectCard
            title="Project 1"
            description="Description 1"
            image="https://via.placeholder.com/150"
            link="https://www.google.com"
            isFocused
          />
          <ProjectCard
            title="Project 2"
            description="Description 2"
            image="https://via.placeholder.com/150"
            link="https://www.google.com"
          />
          <ProjectCard
            title="Project 3"
            description="Description 3"
            image="https://via.placeholder.com/150"
            link="https://www.google.com"
          />
        </div>
      </div>
    </section>
  );
}
