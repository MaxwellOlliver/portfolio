"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils/cn";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  backgroundColor: string;
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
          "flex flex-col items-center justify-center absolute bottom-0 left-0 w-full",
          "bg-white/20 p-12 h-[40%]"
        )}
      >
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-txt-secondary">{description}</p>
      </div>
    </div>
  );
}
