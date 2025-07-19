"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Heart, Music } from "lucide-react";
import { ScrambleTextPlugin } from "gsap/all";
import FlutterLogo from "../logos/FlutterLogo";
import ReactLogo from "../logos/ReactLogo";
import NodeLogo from "../logos/NodeLogo";
import VueLogo from "../logos/VueLogo";
import FigmaLogo from "../logos/FigmaLogo";
import TailwindCSSLogo from "../logos/TailwindCSSLogo";
import PrismaLogo from "../logos/PrismaLogo";
import TypescriptLogo from "../logos/TypescriptLogo";
import NestLogo from "../logos/NestLogo";
import { cn } from "@/utils/cn";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function AboutMeSection() {
  const title = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    gsap.set(title.current, {
      scrambleText: {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        text: "A9x0sAKsdl0",
      },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        text: "About Me",
      },
      scrollTrigger: {
        trigger: title.current,
        start: "top 90%",
        markers: false,
      },
    });
  });

  const logos = [
    { name: "React", Component: ReactLogo },
    { name: "Node.js", Component: NodeLogo },
    { name: "Vue", Component: VueLogo },
    { name: "Figma", Component: FigmaLogo },
    { name: "Tailwind CSS", Component: TailwindCSSLogo },
    { name: "Prisma", Component: PrismaLogo },
    { name: "TypeScript", Component: TypescriptLogo },
    { name: "Flutter", Component: FlutterLogo },
    { name: "NestJS", Component: NestLogo },
  ];

  return (
    <section className="panel flex max-w-screen min-w-screen h-screen z-10 pt-36 pb-20">
      <div className="flex gap-16 max-w-[70rem] w-full justify-between">
        <div className="flex flex-col gap-4 max-w-[32rem] w-full">
          <h2
            ref={title}
            className="font-bold text-txt text-4xl mb-8 scramble-text"
          >
            About Me
          </h2>
          <p className="">
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
          <p className="my-4">You&apos;ll see me using:</p>
          <div className="flex items-center gap-4 mt-2">
            {logos.map((logo, index) => (
              <logo.Component
                key={index}
                className="w-6 h-6"
                data-blobity-tooltip={logo.name}
                aria-label={logo.name}
              />
            ))}
          </div>
          <p className="mt-4">...and more!</p>
          <div className="flex items-center gap-4 mt-6">
            <Gamepad2 />
            <Music />
            <Heart />
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 p-4 rounded-xl border-1 border-txt-secondary/20 w-fit",
            "bg-gradient-to-bl from-transparent via-white/5 to-transparent aspect-square w-[20rem] h-[20rem]",
            "rotate-12"
          )}
          style={{
            maskImage:
              "linear-gradient(225deg, rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 120%), linear-gradient(45deg, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
            maskComposite: "intersect",
          }}
        ></div>
      </div>
    </section>
  );
}
