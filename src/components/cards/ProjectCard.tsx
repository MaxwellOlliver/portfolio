"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import { ComponentType, useRef } from "react";

import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  id: string;
  backgroundColor?: string;
  tools: ComponentType<{ className?: string }>[];
}

export default function ProjectCard({
  title,
  image,
  backgroundColor = "var(--color-primary)",
  id,
  link,
  description,
  tools,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "project-card flex flex-col items-center justify-center w-full h-full",
        "relative group overflow-hidden rounded-md"
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
      <div className="w-full h-full grid grid-cols-[auto_1fr]">
        <div
          className="w-64 aspect-square flex items-center justify-center rounded-md"
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
          className="flex flex-col pl-8 flex-1 h-full justify-between py-12 -ml-2"
          style={{
            background: `linear-gradient(to right, ${backgroundColor}20 0%, var(--background) 40%)`,
          }}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-normal">{title}</h3>
            <p className=" text-txt-secondary max-w-[32rem]">{description}</p>
          </div>

          <footer className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
              >
                <Github className="w-4 text-primary" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
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
