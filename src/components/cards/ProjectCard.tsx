"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils/cn";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  backgroundColor?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  backgroundColor = "var(--color-primary)",
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "project-card flex flex-col items-center justify-center w-full h-full rounded-lg border-1 border-txt-secondary/20",
        "p-4 relative group overflow-hidden aspect-square max-h-[calc(100dvh-14rem)]"
      )}
      style={{ backgroundColor }}
    >
      <Image
        src="/assets/moonly.jpg"
        alt={title}
        width={1600}
        height={1600}
        className="w-full h-full object-contain rounded-lg aspect-square"
      />
      <div
        className={cn(
          "flex flex-col  absolute bottom-0 left-0 w-full",
          "bg-white/80 p-12 h-[40%] text-neutral-900 translate-y-full group-hover:translate-y-0 transition-all duration-300"
        )}
      >
        <h3 className="text-2xl font-bold mb-4 text-primary">{title}</h3>
        <p className="text-sm text-neutral-500 font-xl">{description}</p>
        <a
          href={link}
          target=" _blank"
          rel="noopener noreferrer"
          className="text-sm text-primary underline w-fit mt-2"
          data-blobity-magnetic="false"
        >
          See it live
        </a>
        <div className="flex items-center gap-2 mt-auto">
          <div
            className="p-1"
            data-blobity="true"
            data-blobity-magnetic="false"
          >
            <Github className="size-6 text-neutral-500" />
          </div>
          <div
            className="p-1"
            data-blobity="true"
            data-blobity-magnetic="false"
          >
            <Linkedin className="size-6 text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
