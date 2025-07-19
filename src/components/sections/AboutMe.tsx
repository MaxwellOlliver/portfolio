"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Heart, Music } from "lucide-react";
import ExperienceCard from "../ExperienceCard";
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

import VivinhoLogo from "../../../public/assets/vivinho.svg";
import { cn } from "@/utils/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function AboutMeSection() {
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

  useGSAP(() => {
    const scrambleText = gsap.utils.toArray(".scramble-text");

    // Set initial scrambled state
    gsap.set(scrambleText, {
      scrambleText: {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        text: "A9x0sAKsdl0",
      },
    });

    // Animate to final text when element appears
    gsap.to(scrambleText, {
      duration: 1,
      scrambleText: {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        text: "About Me",
      },
      scrollTrigger: {
        trigger: ".scramble-text",
        start: "top 90%",
        markers: false,
      },
    });
  });

  useEffect(() => {
    if (!container.current) return;

    // Seleciona **só os cards** do segundo painel (.panel:nth-child(2))
    const cards = Array.from(
      container.current.querySelectorAll<HTMLElement>(
        ".panel:nth-child(2) .exp-card" // ajuste o seletor para o wrapper de cada card
      )
    );

    // Estado inicial escondido
    gsap.set(cards, { opacity: 0, x: 100 });

    // IntersectionObserver configurado para triggers horizontais
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // anima só aquele card
            gsap.to(entry.target as HTMLElement, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power1.out",
            });
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport inteira
        rootMargin: "-20% 0px", // 20% pra esquerda e direita—
        // só anima quando card estiver mais que 20% dentro
        threshold: 0.5, // dispara assim que passar do rootMargin
      }
    );

    // Começa a observar
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

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
    <section
      className="relative w-full min-h-dvh overflow-hidden"
      id="about-me"
      style={{
        maskImage:
          "linear-gradient(to right, rgb(0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%)",
        maskComposite: "intersect",
      }}
    >
      <div
        className="layout pt-36 pb-20 flex gap-64 h-screen w-full relative"
        ref={container}
      >
        <div className="panel flex w-full z-10 gap-16">
          <div className="flex flex-col gap-4 min-w-[32rem]">
            <h2 className="font-bold text-txt text-4xl mb-8 scramble-text">
              About Me
            </h2>
            <p className="">
              Hello! I&apos;m <span className="text-primary">Maxwell</span>, a
              passionate software developer with a love for creating innovative
              solutions.
              <br />
              <br />
              With a background in full-stack development, I enjoy working on
              both the{" "}
              <span className="text-primary">front-end and back-end</span> of
              applications. My expertise includes{" "}
              <span className="text-primary">
                React, Node.js, and various other technologies
              </span>
              .
              <br />
              <br />
              When I&apos;m not coding, you can find me exploring new tech
              trends, playing video games or listening/playing to good music.
              Let&apos;s build something amazing together!
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

        <div className="panel flex flex-col z-10 flex-shrink-0">
          <h2 className="font-bold text-txt text-4xl mb-8">Experience</h2>
          <div className="flex gap-14">
            {Array.from({ length: 5 }).map((_, index) => (
              <ExperienceCard
                key={index}
                data={{
                  logo: VivinhoLogo,
                  role: "Full-Stack Developer",
                  company: "Telefónica",
                  date: "Feb 2023 - Present",
                  description:
                    "I worked on the development of a new web application for the company's customers.",
                  points: [
                    "Developed a new web application for the company's customers.",
                    "Developed a new web application for the company's customers.",
                    "Developed a new web application for the company's customers.",
                  ],
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
