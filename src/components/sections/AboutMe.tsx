"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Headphones, Heart, Sparkles } from "lucide-react";
import { ComponentType, useRef } from "react";

import { cn } from "@/utils/cn";

import ClaudeLogo from "../logos/ClaudeLogo";
import DockerLogo from "../logos/DockerLogo";
import FigmaLogo from "../logos/FigmaLogo";
import FlutterLogo from "../logos/FlutterLogo";
import JavaLogo from "../logos/JavaLogo";
import NestLogo from "../logos/NestLogo";
import NextLogo from "../logos/NextLogo";
import NodeLogo from "../logos/NodeLogo";
import PrismaLogo from "../logos/PrismaLogo";
import ReactLogo from "../logos/ReactLogo";
import SpringBootLogo from "../logos/SpringBootLogo";
import TailwindCSSLogo from "../logos/TailwindCSSLogo";
import TypescriptLogo from "../logos/TypescriptLogo";
import VueLogo from "../logos/VueLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

type TechItem = {
  name: string;
  Logo: ComponentType<{ className?: string }>;
};

const frontend: TechItem[] = [
  { name: "React", Logo: ReactLogo },
  { name: "Next.js", Logo: NextLogo },
  { name: "Vue", Logo: VueLogo },
  { name: "TypeScript", Logo: TypescriptLogo },
  { name: "Tailwind", Logo: TailwindCSSLogo },
  { name: "Flutter", Logo: FlutterLogo },
];

const backend: TechItem[] = [
  { name: "Node.js", Logo: NodeLogo },
  { name: "NestJS", Logo: NestLogo },
  { name: "Java", Logo: JavaLogo },
  { name: "Spring Boot", Logo: SpringBootLogo },
  { name: "Prisma", Logo: PrismaLogo },
];

const tooling: TechItem[] = [
  { name: "Docker", Logo: DockerLogo },
  { name: "Figma", Logo: FigmaLogo },
  { name: "Claude", Logo: ClaudeLogo },
];

const glassCard = cn(
  "relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-md",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]",
);

const primaryCard = cn(
  "relative overflow-hidden rounded-2xl bg-primary text-background",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.4)]",
);

function Chip({ name, Logo }: TechItem) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 px-2.5 py-1 rounded-md",
        "border border-foreground-muted/15 bg-white/3 backdrop-blur-sm",
        "text-sm",
      )}
    >
      <Logo className="w-4 h-4" />
      <span>{name}</span>
    </span>
  );
}

function StackCategory({ title, items }: { title: string; items: TechItem[] }) {
  return (
    <div className={cn(glassCard, "p-5 flex flex-col gap-4 min-w-85")}>
      <span
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="relative flex items-baseline justify-between">
        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-foreground-muted">
          {title}
        </h3>
        <span className="font-mono text-xs text-foreground-muted/60">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <div className="relative flex flex-wrap gap-2">
        {items.map((item) => (
          <Chip key={item.name} name={item.name} Logo={item.Logo} />
        ))}
      </div>
    </div>
  );
}

export default function AboutMeSection() {
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    gsap.set(title.current, {
      scrambleText: { chars, text: "A9x0sAKsdl0" },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: { chars, text: "About Me" },
      scrollTrigger: {
        trigger: title.current,
        start: "top 90%",
        markers: false,
      },
    });
  });

  return (
    <div className="flex shrink-0 w-max pl-[10vw]" id="about-me">
      <section
        className={cn(
          "panel flex flex-col z-10 pt-16 pb-20 gap-6",
          "px-[5vw] w-max",
          "tall:w-[90%] tall:max-w-[68rem] tall:mx-auto tall:px-0",
        )}
      >
        <h2 ref={title} className="font-bold text-txt text-4xl scramble-text">
          About Me
        </h2>

        <div
          className={cn(
            "grid gap-4 items-stretch",
            "grid-cols-[30rem_22rem_22rem_22rem_22rem_22rem]",
            "tall:grid-cols-3 tall:w-full",
          )}
        >
          <div
            className={cn(
              glassCard,
              "p-6 flex flex-col gap-4 justify-center min-w-85",
              "taller:col-span-2 taller:p-8",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-3 taller:gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                Hi, I&apos;m Maxwell
              </span>
              <h3 className="text-2xl font-medium leading-snug taller:text-3xl">
                A full-stack developer who cares about{" "}
                <span className="text-primary">
                  craft, motion, and the little details
                </span>{" "}
                that make software feel alive.
              </h3>
              <p className="text-sm text-foreground-muted max-w-[42rem] taller:text-base">
                I move between front-end and back-end — building interfaces that
                feel good to use and APIs that stay out of the way.
              </p>
            </div>
          </div>

          <div className={cn(primaryCard, "p-6 flex flex-col gap-4 min-w-85")}>
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-background/60">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-background/60 animate-ping" />
                <span className="relative rounded-full w-2 h-2 bg-background" />
              </span>
              Currently
            </div>
            <div className="relative flex flex-col gap-2">
              <h3 className="text-lg font-medium leading-snug taller:text-xl">
                Building motion-driven web experiences with React, Next, and
                GSAP.
              </h3>
              <p className="text-sm text-background/70">
                Exploring AI-assisted tooling and the boundary between design
                and engineering.
              </p>
            </div>
          </div>

          <StackCategory title="Frontend" items={frontend} />
          <StackCategory title="Backend" items={backend} />
          <StackCategory title="Tooling & AI" items={tooling} />

          <div
            className={cn(
              primaryCard,
              "p-6 flex flex-col gap-3 justify-center min-w-85",
              "taller:col-span-3 taller:px-6 taller:py-4 taller:flex-row taller:items-center taller:justify-between taller:gap-4",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-background/70" />
              <span className="text-xs uppercase tracking-[0.2em] text-background/60">
                Off the clock
              </span>
            </div>
            <div className="relative flex flex-col gap-2 text-sm taller:flex-row taller:items-center taller:gap-6">
              <span className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>Video games</span>
              </span>
              <span className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                <span>Music</span>
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Good coffee</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
