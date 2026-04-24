"use client";

import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

import type { StackItem } from "@/data/stack";
import { glassCard, primaryCard } from "@/utils/cardStyles";
import { cn } from "@/utils/cn";

export interface ExperienceData {
  logo: string | StaticImageData;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | "present";
  description: string;
  points: string[];
  tech: StackItem[];
  current?: boolean;
  showYear?: boolean;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMonthYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function fullYear(iso: string) {
  return iso.split("-")[0];
}

function computeDurationParts(startISO: string, endISO: string | "present") {
  const [sy, sm] = startISO.split("-").map(Number);
  const end =
    endISO === "present"
      ? new Date()
      : (() => {
          const [y, m] = endISO.split("-").map(Number);
          return new Date(y, m - 1, 1);
        })();
  const totalMonths =
    (end.getFullYear() - sy) * 12 + (end.getMonth() - (sm - 1));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return { years, months };
}

export default function ExperienceCard({ data }: { data: ExperienceData }) {
  const t = useTranslations("experience");
  const {
    logo,
    role,
    company,
    location,
    startDate,
    endDate,
    description,
    points,
    tech,
    current,
    showYear = true,
  } = data;

  const year = fullYear(startDate);
  const range = `${formatMonthYear(startDate)} — ${
    endDate === "present" ? t("endPresent") : formatMonthYear(endDate)
  }`;
  const { years, months } = computeDurationParts(startDate, endDate);
  const duration =
    years === 0
      ? t("duration.monthsOnly", { months })
      : months === 0
        ? t("duration.yearsOnly", { years })
        : t("duration.yearsAndMonths", { years, months });

  return (
    <article
      className={cn(
        "exp-card relative",
        "max-md:w-full",
        "md:flex md:flex-col md:h-full md:min-h-0 md:w-104 md:min-w-104 md:shrink-0",
      )}
    >
      <header
        className={cn(
          "relative flex items-center shrink-0",
          "md:mb-5 md:gap-4 md:h-15",
          showYear && "max-md:mb-3 max-md:gap-3 max-md:h-12",
        )}
      >
        {showYear && (
          <>
            <span
              className={cn(
                "exp-node z-10 shrink-0 block",
                "max-md:absolute max-md:-left-6 max-md:top-1/2 max-md:-translate-y-1/2",
                "md:relative",
              )}
            >
              <span
                className={cn(
                  "block size-2.5 rounded-full ring-[3px] ring-background",
                  current ? "bg-primary" : "bg-foreground-muted/50",
                )}
              />
              {current && (
                <span className="absolute inset-0 size-2.5 rounded-full bg-primary animate-ping opacity-60" />
              )}
            </span>
            <span className="exp-year font-mono text-5xl md:text-6xl text-foreground-muted/70 leading-none select-none tracking-tight tabular-nums">
              {year}
            </span>
          </>
        )}
        {current && (
          <span className="max-md:hidden md:ml-auto text-[10px] uppercase tracking-[0.2em] text-foreground-muted flex items-center gap-1.5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping" />
              <span className="relative rounded-full w-1.5 h-1.5 bg-primary" />
            </span>
            {t("current")}
          </span>
        )}
      </header>

      <div
        className={cn(
          current ? primaryCard : glassCard,
          "p-5 flex flex-col gap-4 md:flex-1 md:min-h-0 md:overflow-y-auto",
        )}
      >
        <span
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent"
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-3">
          <div className="size-10 rounded-md overflow-hidden">
            <Image
              src={logo}
              alt={company}
              className="object-contain size-full"
            />
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.2em]",
                current ? "text-background/60" : "text-foreground-muted",
              )}
            >
              {range}
            </span>
            <span
              className={cn(
                "font-mono text-xs",
                current ? "text-background/50" : "text-foreground-muted/60",
              )}
            >
              {duration}
            </span>
          </div>
        </div>

        <div className="relative flex flex-col gap-0.5">
          <h3
            className={cn(
              "text-xl font-medium leading-snug",
              current ? "text-background" : "text-foreground",
            )}
          >
            {role}
          </h3>
          <p
            className={cn(
              "text-sm",
              current ? "text-background/70" : "text-primary",
            )}
          >
            {company}
            {location && (
              <span
                className={cn(
                  current ? "text-background/50" : "text-foreground-muted",
                )}
              >
                {" · "}
                {location}
              </span>
            )}
          </p>
        </div>

        <span
          className={cn(
            "relative h-px",
            current ? "bg-background/15" : "bg-foreground-muted/15",
          )}
        />

        <p
          className={cn(
            "relative text-sm leading-relaxed",
            current ? "text-background/80" : "text-foreground-muted",
          )}
        >
          {description}
        </p>

        <ul className="relative flex flex-col gap-2">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 items-start" data-no-blobity>
              <span
                className={cn(
                  "font-mono text-[10px] pt-0.75 shrink-0 tracking-wider",
                  current ? "text-background/40" : "text-foreground-muted/50",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-sm leading-relaxed",
                  current ? "text-background/80" : "text-foreground-muted",
                )}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>

        {tech.length > 0 && (
          <div className="relative flex items-center justify-between pt-2 mt-auto">
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.2em]",
                current ? "text-background/50" : "text-foreground-muted/70",
              )}
            >
              {t("stack")}
            </span>
            <div className="flex items-center gap-2.5">
              {tech.map((item) => (
                <item.logo
                  key={item.id}
                  className="w-4 h-4"
                  data-blobity-tooltip={item.name}
                  data-blobity-magnetic="false"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
