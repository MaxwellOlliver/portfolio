"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Headphones, Heart, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { STACK } from "@/data/stack";
import { primaryCard } from "@/utils/cardStyles";
import { cn } from "@/utils/cn";
import { SCRAMBLE_CHARS } from "@/utils/scramble";

import StackCategory from "./about/StackCategory";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const frontend = [
  STACK.react,
  STACK.reactNative,
  STACK.next,
  STACK.vue,
  STACK.typescript,
  STACK.flutter,
];

const backend = [
  STACK.node,
  STACK.express,
  STACK.nest,
  STACK.postgres,
  STACK.mongo,
  STACK.redis,
];

const tooling = [
  STACK.docker,
  STACK.aws,
  STACK.azureDevops,
  STACK.figma,
  STACK.claude,
];

export default function AboutMeSection() {
  const t = useTranslations("about");
  const title = useRef<HTMLHeadingElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const titleText = t("title");

  useGSAP(() => {
    gsap.set(title.current, {
      scrambleText: { chars: SCRAMBLE_CHARS, text: "A9x0sAKsdl0" },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: { chars: SCRAMBLE_CHARS, text: titleText },
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
        "md:w-max md:lg:pl-[10vw] md:mr-16 md:h-full md:min-h-0",
      )}
      id="about-me"
    >
      <section
        className={cn(
          "panel flex flex-col z-10 pt-16 pb-20 gap-6",
          "max-md:w-full max-md:px-4",
          "md:w-max md:h-full md:min-h-0",
          "tall:w-[90%] tall:max-w-272 tall:mx-auto tall:px-0",
        )}
      >
        <h2
          ref={title}
          className="font-bold text-txt text-4xl scramble-text shrink-0 ml-4"
        >
          {titleText}
        </h2>

        <div
          ref={grid}
          className={cn(
            "grid gap-4 items-stretch px-4",
            "max-md:grid-cols-1",
            "md:grid-cols-[30rem_22rem_22rem_22rem_22rem_22rem] md:grid-rows-1 md:auto-rows-fr md:flex-1 md:min-h-0 md:overflow-hidden",
            "tall:grid-cols-3 tall:grid-rows-2",
            "taller:grid-rows-[minmax(0,1fr)_auto_auto] tall:w-full",
          )}
        >
          <div
            className={cn(
              "about-card  flex flex-col gap-4 justify-center md:min-w-72",
              "taller:col-span-2 ",
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
