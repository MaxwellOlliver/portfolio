import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../ui/Dropdown";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const t = useTranslations("navbar");
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const items = [
    {
      label: t("home"),
      href: "#home",
    },
    {
      label: t("about"),
      href: "#about-me",
    },
    {
      label: t("projects"),
      href: "#projects",
    },
  ];

  const moreOptions = [
    {
      label: t("contact"),
      href: "#contact",
    },
    {
      label: t("resume"),
      href: "/resume",
    },
  ];

  useGSAP(() => {
    gsap.from(".navbar", {
      opacity: 0,
      scale: 0.9,
      y: -100,
      delay: 0.5,
    });
  });

  useEffect(() => {
    function handleScroll() {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        lastScrollY.current = currentScrollY;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.to(".navbar", {
        y: isScrolled ? -100 : 0,
        scale: isScrolled ? 0.9 : 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    },
    { dependencies: [isScrolled] },
  );

  return (
    <nav
      className={cn(
        "navbar fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-xl",
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
        {items.map((item) => (
          <a
            href={item.href}
            key={item.label}
            className="px-2 py-1 md:px-4 rounded-md text-nowrap"
          >
            {item.label}
          </a>
        ))}
        <div className="w-[1px] h-4 bg-neutral-600"></div>
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
            {moreOptions.map((option) => (
              <DropdownItem key={option.href} href={option.href}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
