"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import Image from "next/image";
import { ComponentType, useRef } from "react";

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
  index?: number;
  total?: number;
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
  index = 0,
  total = 0,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const label = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <article
      className={cn(
        "project-card group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/3 backdrop-blur-md",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]",
        "grid grid-cols-1 md:grid-cols-[17rem_1fr]",
      )}
      ref={cardRef}
      id={id}
    >
      <span
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background: `linear-gradient(to bottom, ${backgroundColor}33 0%, transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 max-md:hidden"
        style={{
          background: `linear-gradient(to right, ${backgroundColor}33 0%, transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div
        className="relative flex items-center justify-center p-6 aspect-[16/10] md:aspect-auto"
        style={{ backgroundColor }}
      >
        <span
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/12 via-transparent to-black/10"
          aria-hidden="true"
        />
        <Image
          src={image}
          alt={title}
          width={1200}
          height={1200}
          className="relative w-full h-full max-w-44 max-h-44 object-contain pointer-events-none select-none"
        />
      </div>

      <div className="relative flex flex-col justify-between gap-5 p-6 md:py-7 md:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
              <span style={{ color: backgroundColor }}>{label}</span>
              <span className="text-foreground-muted/40">/ {totalLabel}</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
              Case study
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-medium leading-snug">{title}</h3>
            <p className="text-sm text-foreground-muted max-w-[32rem] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <span className="h-px bg-foreground-muted/15" />

        <footer className="flex items-center gap-4 justify-between flex-wrap">
          <div className="flex items-center gap-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <Github className="w-4 h-4" style={{ color: backgroundColor }} />
                <span className="text-sm">GitHub</span>
              </a>
            )}
            {websiteLink && (
              <a
                href={websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-fit"
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <Globe className="w-4 h-4" style={{ color: backgroundColor }} />
                <span className="text-sm">Website</span>
                <ArrowUpRight className="w-3 h-3 text-foreground-muted" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted/70">
              Stack
            </span>
            {tools.map((Tool, i) => (
              <Tool key={i} className="w-4 h-4" />
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}
