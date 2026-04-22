import { type ComponentType } from "react";

import { cn } from "@/utils/cn";

export type TechItem = {
  name: string;
  Logo: ComponentType<{ className?: string }>;
};

export default function TechChip({ name, Logo }: TechItem) {
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
