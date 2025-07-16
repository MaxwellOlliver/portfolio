"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Heart, Music } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutMeSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const el = container.current! as HTMLElement;
      const panels = el.querySelectorAll(".panel");
      const lastPanel = panels[panels.length - 1] as HTMLElement;

      gsap.to(el, {
        x: () => {
          // Calculate distance to show the last panel completely
          const lastPanelEnd =
            lastPanel.offsetLeft +
            lastPanel.offsetWidth +
            el.getBoundingClientRect().left +
            100;
          return -(lastPanelEnd - window.innerWidth);
        },
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => {
            // Scroll distance should match the animation distance
            const lastPanelEnd = lastPanel.offsetLeft + lastPanel.offsetWidth;
            return "+=" + (lastPanelEnd - window.innerWidth) + "px";
          },
          scrub: true,
          pin: true,
          markers: true,
          anticipatePin: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            console.log(self.progress);
          },
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      className="relative w-full min-h-dvh overflow-hidden"
      id="about-me"
    >
      <div
        className="layout pt-36 pb-20 flex gap-64 h-screen w-full relative"
        ref={container}
      >
        <div className="panel flex flex-col min-w-[32rem] max-w-[64rem] z-10">
          <h2 className="font-bold text-txt text-4xl mb-4">About Me</h2>
          <p className="text-txt-secondary">
            Hello! I&apos;m <span className="text-primary">Maxwell</span>, a
            passionate software developer with a love for creating innovative
            solutions.
            <br />
            <br />
            With a background in full-stack development, I enjoy working on both
            the <span className="text-primary">front-end and back-end</span> of
            applications. My expertise includes{" "}
            <span className="text-primary">
              React, Node.js, and various other technologies
            </span>
            .
            <br />
            <br />
            When I&apos;m not coding, you can find me exploring new tech trends,
            playing video games or listening/playing to good music. Let&apos;s
            build something amazing together!
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Gamepad2 />
            <Music />
            <Heart />
          </div>
        </div>
        <div className="panel flex item-center justify-center flex-shrink-0">
          PHOTO
        </div>
        <div className="panel flex flex-col z-10 flex-shrink-0">
          <h2 className="font-bold text-txt text-4xl mb-4">Experience</h2>
          <div className="flex gap-14">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                className="aspect-square bg-red-500 min-w-[20rem]"
                key={index}
              >
                exp {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
