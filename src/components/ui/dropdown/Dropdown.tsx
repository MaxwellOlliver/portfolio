"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import { DropdownContext } from "./context";

type DropdownProps = {
  children: ReactNode;
  className?: string;
};

export default function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClick(event: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((v) => !v),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      <div
        ref={rootRef}
        className={cn("relative", className)}
        data-no-blobity
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
