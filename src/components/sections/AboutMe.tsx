"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Headphones, Heart, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
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
    <div
      className={cn(glassCard, "about-card p-5 flex flex-col gap-4 md:min-w-72")}
    >
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
  const t = useTranslations("about");
  const title = useRef<HTMLHeadingElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const titleText = t("title");

  useGSAP(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    gsap.set(title.current, {
      scrambleText: { chars, text: "A9x0sAKsdl0" },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: { chars, text: titleText },
      scrollTrigger: {
        trigger: title.current,
        start: "top 90%",
        markers: false,
      },
    });

    const cards = gsap.utils.toArray<HTMLElement>(".about-card");
    gsap.set(cards, { opacity: 0, y: 24, scale: 0.96 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: grid.current,
        start: "top 85%",
        once: true,
      },
    });
  });

  return (
    <div
      className={cn(
        "flex shrink-0",
        "max-md:w-full",
        "md:w-max md:lg:pl-[10vw] md:mr-16",
      )}
      id="about-me"
    >
      <section
        className={cn(
          "panel flex flex-col z-10 pt-16 pb-20 gap-6",
          "max-md:w-full max-md:px-4",
          "md:px-[5vw] md:w-max",
          "tall:w-[90%] tall:max-w-[68rem] tall:mx-auto tall:px-0",
        )}
      >
        <h2 ref={title} className="font-bold text-txt text-4xl scramble-text">
          {titleText}
        </h2>

        <div
          ref={grid}
          className={cn(
            "grid gap-4 items-stretch",
            "max-md:grid-cols-1",
            "md:grid-cols-[30rem_22rem_22rem_22rem_22rem_22rem]",
            "tall:grid-cols-3 tall:w-full",
          )}
        >
          <div
            className={cn(
              glassCard,
              "about-card p-6 flex flex-col gap-4 justify-center md:min-w-72",
              "taller:col-span-2 taller:p-8",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-3 taller:gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                {t("intro.eyebrow")}
              </span>
              <h3 className="text-2xl font-medium leading-snug taller:text-3xl">
                {t.rich("intro.headline", {
                  emphasis: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </h3>
              <p className="text-sm text-foreground-muted max-w-[42rem] taller:text-base">
                {t("intro.description")}
              </p>
            </div>
          </div>

          <div
            className={cn(
              primaryCard,
              "about-card p-6 flex flex-col gap-4 md:min-w-72",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-background/60">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-background/60 animate-ping" />
                <span className="relative rounded-full w-2 h-2 bg-background" />
              </span>
              {t("current.label")}
            </div>
            <div className="relative flex flex-col gap-2">
              <h3 className="text-lg font-medium leading-snug taller:text-xl">
                {t("current.headline")}
              </h3>
              <p className="text-sm text-background/70">
                {t("current.description")}
              </p>
            </div>
          </div>

          <StackCategory title={t("stack.frontend")} items={frontend} />
          <StackCategory title={t("stack.backend")} items={backend} />
          <StackCategory title={t("stack.tooling")} items={tooling} />

          <div
            className={cn(
              primaryCard,
              "about-card p-6 flex flex-col gap-3 justify-center md:min-w-72",
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
                {t("offTheClock.label")}
              </span>
            </div>
            <div className="relative flex flex-col gap-2 text-sm taller:flex-row taller:items-center taller:gap-6">
              <span className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>{t("offTheClock.games")}</span>
              </span>
              <span className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                <span>{t("offTheClock.music")}</span>
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{t("offTheClock.coffee")}</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
