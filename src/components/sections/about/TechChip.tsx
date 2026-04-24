import type { StackItem } from "@/data/stack";
import { cn } from "@/utils/cn";

export default function TechChip({ name, logo: Logo }: StackItem) {
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
