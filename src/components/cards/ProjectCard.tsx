"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import { ComponentType, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubLink?: string;
  websiteLink?: string;
  id: string;
  backgroundColor?: string;
  tools: ComponentType<{ className?: string }>[];
}

export default function ProjectCard({
  title,
  image,
  backgroundColor = "var(--color-primary)",
  id,
  githubLink,
  websiteLink,
  description,
  tools,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMd = useMediaQuery("(max-width: 768px)");

  console.log(isMd);

  return (
    <div
      className={cn(
        "project-card flex flex-col items-center justify-center w-full h-full max-md:mb-8",
        "relative group overflow-hidden"
      )}
      // style={{
      //   backgroundColor,
      //   backgroundImage: `url(${image})`,
      //   backgroundSize: "contain",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
      ref={cardRef}
      id={id}
    >
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-[auto_1fr]">
        <div
          className="w-full md:w-64 p-4 md:aspect-square flex items-center justify-center rounded-md max-md:mx-auto max-md:-mb-4 max-md:z-10"
          style={{ backgroundColor }}
        >
          <Image
            src={image}
            alt={title}
            width={1600}
            height={1600}
            className="w-full h-full object-contain aspect-square rounded-md max-w-52 pointer-events-none select-none "
          />
        </div>
        <div
          className="flex flex-col px-8 flex-1 gap-4 h-full justify-between py-12 max-md:-mt-1 md:-ml-1 max-md:rounded-md"
          style={{
            background: `linear-gradient(to ${
              isMd ? "bottom" : "right"
            }, ${backgroundColor}${isMd ? 40 : 20} 0%, var(--background) 40%)`,
          }}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-normal">{title}</h3>
            <p className=" text-txt-secondary max-w-[32rem]">{description}</p>
          </div>

          <footer className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <Github className="w-4 text-primary" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <Globe className="w-4 text-primary" />
                <span className="text-sm">Website</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              {tools.map((Tool) => (
                <Tool key={Tool.name} className="w-4 h-4" />
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
