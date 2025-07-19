"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/all";
import ExperienceCard from "../cards/ExperienceCard";

import VivinhoLogo from "../../../public/assets/vivinho.svg";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function ExperienceSection() {
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!title.current) return;

    gsap.set(title.current, {
      scrambleText: {
        chars,
        text: "Tir0w9ksdlfm",
      },
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(title.current, {
              duration: 1,
              scrambleText: {
                chars,
                text: "Experience",
              },
              repeat: -1,
            });
          }
        });
      },
      {
        root: null,
        threshold: 1,
      }
    );

    // observer.observe(title.current as HTMLElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="panel flex w-fit h-screen z-10 pt-36 pb-20">
      <div className="flex w-fit flex-col">
        <h2
          ref={title}
          className="font-bold text-txt text-4xl mb-8 scramble-text w-fit"
        >
          Experience
        </h2>
        <div className="flex gap-14 w-fit">
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
    </section>
  );
}
