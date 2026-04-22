import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import Dropdown from "../ui/dropdown/Dropdown";
import DropdownItem from "../ui/dropdown/DropdownItem";
import DropdownMenu from "../ui/dropdown/DropdownMenu";
import DropdownTrigger from "../ui/dropdown/DropdownTrigger";

gsap.registerPlugin(useGSAP);

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about-me" },
  { key: "projects", href: "#projects" },
] as const;

const moreItems = [
  { key: "contact", href: "#contact" },
  { key: "resume", href: "/resume" },
] as const;

export default function Navbar() {
  const t = useTranslations("navbar");
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -100,
        delay: 0.5,
      });
    },
    { scope: navRef },
  );

  useEffect(() => {
    let lastY = window.scrollY;
    function handleScroll() {
      const currentY = window.scrollY;
      setIsScrolled(currentY > lastY);
      lastY = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.to(navRef.current, {
        y: isScrolled ? -100 : 0,
        scale: isScrolled ? 0.9 : 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    },
    { dependencies: [isScrolled], scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-xl",
        "max-w-[calc(100vw-1rem)]",
        "px-2 py-1 md:px-3",
        "border border-white/10 bg-white/3 backdrop-blur-md",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]",
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-white/4 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-1 md:gap-4 text-sm md:text-base">
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.key}
            className="px-2 py-1 md:px-4 rounded-md text-nowrap"
          >
            {t(item.key)}
          </a>
        ))}
        <div className="w-px h-4 bg-neutral-600" />
        <Dropdown>
          <DropdownTrigger>
            {({ isOpen, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="px-2 py-1 md:p-2 flex items-center gap-1 md:gap-2 rounded-md text-neutral-500 cursor-pointer text-nowrap"
              >
                {t("more")}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            )}
          </DropdownTrigger>
          <DropdownMenu align="end">
            {moreItems.map((option) => (
              <DropdownItem key={option.href} href={option.href}>
                {t(option.key)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
