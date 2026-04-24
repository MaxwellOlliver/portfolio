import type { StackItem } from "@/data/stack";
import { glassCard } from "@/utils/cardStyles";
import { cn } from "@/utils/cn";

import TechChip from "./TechChip";

interface StackCategoryProps {
  title: string;
  items: StackItem[];
  className?: string;
}

export default function StackCategory({
  title,
  items,
  className,
}: StackCategoryProps) {
  return (
    <div
      className={cn(
        glassCard,
        "about-card p-5 flex flex-col gap-4 md:min-w-72",
        className,
      )}
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
          <TechChip key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
