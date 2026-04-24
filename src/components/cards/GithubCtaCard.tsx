"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

const GITHUB_URL = "https://github.com/MaxwellOlliver";
const GITHUB_HANDLE = "github.com/MaxwellOlliver";

const GRAPH_ROWS = 6;
const GRAPH_COLS = 38;
const GRAPH_CELLS = Array.from(
  { length: GRAPH_ROWS * GRAPH_COLS },
  (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    if (r < 0.4) return 0;
    if (r < 0.68) return 1;
    if (r < 0.86) return 2;
    if (r < 0.96) return 3;
    return 4;
  },
);

const PULSE_DELAYS = [0, 1.2, 2.4, 3.6, 4.8];
const PULSE_INDICES = [42, 97, 154, 198, 221];

const intensityClasses: Record<number, string> = {
  0: "bg-foreground/5",
  1: "bg-[#9be9a8]",
  2: "bg-[#40c463]",
  3: "bg-[#30a14e]",
  4: "bg-[#216e39]",
};

export default function GithubCtaCard() {
  const t = useTranslations("projects.githubCta");

  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "project-card group relative overflow-hidden rounded-2xl block",
        "border border-dashed border-foreground/20 bg-background-secondary",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),0_4px_20px_-8px_rgba(0,0,0,0.15)]",
        "transition-colors hover:border-foreground/35 hover:bg-white",
      )}
      data-blobity="true"
      data-blobity-magnetic="false"
      data-blobity-radius="16"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-end",
          "[mask-image:linear-gradient(to_left,black_0%,black_30%,transparent_75%)]",
        )}
        aria-hidden="true"
      >
        <div
          className="grid gap-[3px] w-full h-full p-5"
          style={{
            gridTemplateColumns: `repeat(${GRAPH_COLS}, minmax(0, 1fr))`,
          }}
        >
          {GRAPH_CELLS.map((intensity, i) => {
            const pulseIdx = PULSE_INDICES.indexOf(i);
            const isPulsing = pulseIdx !== -1;
            return (
              <span
                key={i}
                className={cn(
                  "aspect-square rounded-[2px]",
                  intensityClasses[intensity],
                  isPulsing &&
                    "animate-pulse [animation-duration:2.4s] shadow-[0_0_6px_rgba(64,196,99,0.7)]",
                )}
                style={
                  isPulsing
                    ? { animationDelay: `${PULSE_DELAYS[pulseIdx]}s` }
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>

      <span
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-background-secondary via-background-secondary/70 to-transparent"
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative flex items-center gap-5 md:gap-7 px-5 md:px-7 py-5 md:py-6",
          "max-md:flex-col max-md:items-start max-md:gap-4",
        )}
      >
        <div
          className={cn(
            "relative shrink-0 flex items-center justify-center w-14 h-14 rounded-xl",
            "border border-foreground/10 bg-white",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_2px_8px_-4px_rgba(0,0,0,0.15)]",
            "transition-transform duration-500 group-hover:rotate-[-6deg]",
          )}
        >
          <Github
            className="w-6 h-6 text-foreground"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
            <span>{t("eyebrow")}</span>
            <span className="text-foreground-muted/40">/</span>
            <span className="truncate">{GITHUB_HANDLE}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-medium leading-snug text-foreground">
            {t("headline")}
          </h3>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-[36rem]">
            {t("description")}
          </p>
        </div>

        <div
          className={cn(
            "relative shrink-0 flex items-center gap-2.5 pl-4 pr-3 py-2.5 rounded-full overflow-hidden",
            "border border-foreground/10 bg-foreground",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_24px_-12px_rgba(0,0,0,0.4)]",
            "transition-all duration-300",
            "group-hover:bg-primary",
          )}
        >
          <span
            className={cn(
              "pointer-events-none absolute inset-0 -translate-x-full",
              "bg-linear-to-r from-transparent via-white/20 to-transparent",
              "group-hover:translate-x-full transition-transform duration-1000",
            )}
            aria-hidden="true"
          />
          <span className="relative text-sm font-medium text-background">
            {t("action")}
          </span>
          <span
            className={cn(
              "relative flex items-center justify-center w-6 h-6 rounded-full",
              "bg-background/15 transition-colors duration-300",
              "group-hover:bg-background/25",
            )}
          >
            <ArrowUpRight
              className={cn(
                "w-3.5 h-3.5 text-background transition-transform duration-300",
                "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              )}
            />
          </span>
        </div>
      </div>
    </a>
  );
}
