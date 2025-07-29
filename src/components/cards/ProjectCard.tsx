"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !infoCardRef.current || !wrapperRef.current) return;

    gsap.set(cardRef.current, { opacity: 0, y: 100 });
    gsap.set(infoCardRef.current, { y: "100%" });

    // Fade-in as the card scrolls in
    gsap.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        markers: true,
      },
    });

    // Pin only when the card reaches the top
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 10%", // starts pinning when card hits top
        end: "+=100%", // scroll distance while pinned
        scrub: true,
        pin: true,
        markers: true,
        pinSpacing: true,
      },
    });

    tl.to(infoCardRef.current, {
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div
        className={cn(
          "project-card flex flex-col items-center justify-center w-full h-full rounded-lg border-1 border-txt-secondary/20",
          "p-4 relative group overflow-hidden aspect-square max-h-[calc(100dvh-14rem)]"
        )}
        style={{ backgroundColor }}
        ref={cardRef}
      >
        <Image
          src={image}
          alt={title}
          width={1600}
          height={1600}
          className="w-full h-full object-contain rounded-lg aspect-square"
        />
        <div
          className={cn(
            "flex flex-col  absolute bottom-0 left-0 w-full",
            "bg-white p-12 text-neutral-900 "
          )}
          ref={infoCardRef}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: backgroundColor }}
          >
            {title}
          </h3>
          <p className="text-sm text-neutral-500 font-xl">{description}</p>
          <a
            href={link}
            target=" _blank"
            rel="noopener noreferrer"
            className="text-sm underline w-fit mt-2 mb-4"
            data-blobity-magnetic="false"
            style={{ color: backgroundColor }}
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
    </div>
  );
}
