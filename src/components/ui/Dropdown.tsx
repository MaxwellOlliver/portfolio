"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/utils/cn";

type DropdownContextValue = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(
      "Dropdown subcomponents must be rendered inside <Dropdown>",
    );
  }
  return ctx;
}

type DropdownProps = {
  children: ReactNode;
  className?: string;
};

export function Dropdown({ children, className }: DropdownProps) {
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

type DropdownTriggerProps = {
  children: (ctx: DropdownContextValue) => ReactNode;
};

export function DropdownTrigger({ children }: DropdownTriggerProps) {
  const ctx = useDropdownContext();
  return <>{children(ctx)}</>;
}

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

export function DropdownMenu({
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

export function DropdownItem({
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
