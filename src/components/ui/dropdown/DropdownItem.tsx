"use client";

import { type ReactNode } from "react";

import { cn } from "@/utils/cn";

import { useDropdownContext } from "./context";

type DropdownItemProps = {
  children: ReactNode;
  href?: string;
  download?: string | boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  closeOnClick?: boolean;
};

export default function DropdownItem({
  children,
  href,
  download,
  onClick,
  target,
  rel,
  className,
  closeOnClick = true,
}: DropdownItemProps) {
  const { close } = useDropdownContext();
  const handleClick = () => {
    onClick?.();
    if (closeOnClick) close();
  };

  const classes = cn(
    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
    "hover:bg-white/5 transition-colors",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={handleClick}
        role="menuitem"
        className={classes}
        data-blobity="true"
        data-blobity-magnetic="false"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      role="menuitem"
      className={cn(classes, "w-full text-left cursor-pointer")}
      data-blobity="true"
      data-blobity-magnetic="false"
    >
      {children}
    </button>
  );
}
