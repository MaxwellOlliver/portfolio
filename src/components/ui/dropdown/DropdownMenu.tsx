"use client";

import { type ReactNode } from "react";

import { cn } from "@/utils/cn";

import { useDropdownContext } from "./context";

type MenuAlign = "start" | "center" | "end";

const alignClasses: Record<MenuAlign, string> = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
};

type DropdownMenuProps = {
  children: ReactNode;
  className?: string;
  align?: MenuAlign;
};

export default function DropdownMenu({
  children,
  className,
  align = "center",
}: DropdownMenuProps) {
  const { isOpen } = useDropdownContext();
  return (
    <div
      role="menu"
      aria-hidden={!isOpen}
      className={cn(
        "absolute top-full mt-2 min-w-full w-max z-20",
        "rounded-xl border border-white/10 bg-background/90 backdrop-blur-md p-1.5",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_24px_-8px_rgba(0,0,0,0.5)]",
        "origin-top transition duration-150",
        alignClasses[align],
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
