import { cn } from "@/utils/cn";

export const glassCard = cn(
  "relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-md",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]",
);

export const primaryCard = cn(
  "relative overflow-hidden rounded-2xl bg-primary text-background",
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.4)]",
);
