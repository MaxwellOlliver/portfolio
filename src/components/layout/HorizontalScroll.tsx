"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { cn } from "@/utils/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const container = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const el = container.current! as HTMLElement;
        const content = el.querySelector(".content")! as HTMLElement;

        gsap.to(el, {
          x: () => {
            return -(
              content.getBoundingClientRect().width -
              window.innerWidth * 0.66
            );
          },
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => {
              return "+=" + content.getBoundingClientRect().width / 2 + "px";
            },
            scrub: 0.5,
            pin: true,
            markers: false,
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section
      className={cn(
        "relative w-full",
        "md:min-h-[max(100dvh,700px)] md:overflow-hidden",
        "md:[mask-image:linear-gradient(to_right,rgb(0,0,0)_90%,rgba(0,0,0,0)_100%)]",
        "md:[mask-composite:intersect]",
      )}
      id="horizontal-scroll"
    >
      <div
        className="flex max-md:flex-col relative md:h-[max(100dvh,700px)] md:will-change-transform"
        ref={container}
      >
        <div className="content flex max-md:flex-col md:w-fit">{children}</div>
      </div>
    </section>
  );
}
