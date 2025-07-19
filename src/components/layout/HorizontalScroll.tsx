"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/all";
import AboutMeSection from "../sections/AboutMe";
import ExperienceSection from "../sections/ExperienceSection";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function HorizontalScroll() {
  const container = useRef(null);

  useGSAP(
    () => {
      const el = container.current! as HTMLElement;
      const panels = el.querySelectorAll(".panel");
      const lastPanel = panels[panels.length - 1] as HTMLElement;
      const tl = gsap.timeline();

      tl.to(el, {
        x: () => {
          const lastPanelEnd =
            lastPanel.offsetLeft +
            lastPanel.offsetWidth +
            el.getBoundingClientRect().left +
            300;

          return -(lastPanelEnd - window.innerWidth);
        },
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => {
            const lastPanelEnd = lastPanel.offsetLeft + lastPanel.offsetWidth;
            return "+=" + (lastPanelEnd - window.innerWidth) + "px";
          },
          scrub: true,
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
      <div className="layout flex h-screen w-full relative" ref={container}>
        <AboutMeSection />
        <ExperienceSection />
      </div>
    </section>
  );
}
