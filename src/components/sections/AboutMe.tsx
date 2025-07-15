"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad, Gamepad2, Heart, Music } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutMeSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      const el = container.current! as HTMLElement;
      const panels = el.querySelectorAll(".panel");
      const totalScroll = el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top", // when top of container hits top of viewport
          end: () => `+=${totalScroll}`, // scroll distance = total horizontal overflow
          scrub: true, // smooth scrubbing, ties animation to scroll
          pin: true, // pins the container in place
          markers: true, // enable to see start/end in dev
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
        className="layout pt-36 pb-20 flex gap-64 min-h-[calc(100dvh-10rem)] relative w-full"
        ref={container}
      >
        <div className="panel flex flex-col max-w-[30rem] w-full z-10 flex-shrink-0">
          <h2 className="font-bold text-txt text-4xl mb-4">About Me</h2>
          <p className="text-txt-secondary">
            Hello! I'm <span className="text-primary">Maxwell</span>, a
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
            When I'm not coding, you can find me exploring new tech trends,
            playing video games or listening/playing to good music. Let's build
            something amazing together!
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
        <div className="panel flex flex-col max-w-[30rem] z-10 flex-shrink-0">
          <h2 className="font-bold text-txt text-4xl mb-4">Experience</h2>
          <div className="flex gap-14">
            <div>exp 1</div>
            <div>exp 1</div>
            <div>exp 1</div>
            <div>exp 1</div>
            <div>exp 1</div>
            <div>exp 1</div>
          </div>
        </div>
      </div>
    </section>
  );
}
