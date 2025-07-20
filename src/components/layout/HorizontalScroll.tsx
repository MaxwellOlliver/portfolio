"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const container = useRef(null);

  useGSAP(
    () => {
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
    },
    { scope: container }
  );

  return (
    <section
      className="relative w-full min-h-dvh overflow-hidden"
      id="horizontal-scroll"
      style={{
        maskImage:
          "linear-gradient(to right, rgb(0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%)",
        maskComposite: "intersect",
      }}
    >
      <div
        className="flex h-screen relative will-change-transform"
        ref={container}
      >
        <div className="content flex w-fit">{children}</div>
      </div>
    </section>
  );
}
