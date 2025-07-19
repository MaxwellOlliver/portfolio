"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/all";
import ExperienceCard from "../cards/ExperienceCard";

import VivinhoLogo from "../../../public/assets/vivinho.svg";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function ExperienceSection() {
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.set(title.current, {
      scrambleText: {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        text: "Tir0w9ksdlfm",
      },
    });

    gsap.to(title.current, {
      duration: 1,
      scrambleText: {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        text: "Experience",
      },
      scrollTrigger: {
        trigger: title.current,
        start: "top 90%",
        markers: false,
      },
    });
  });

  return (
    <section className="panel flex max-w-screen h-screen z-10 pt-36 pb-20">
      <div className="flex gap-16 max-w-[64rem] w-full flex-col">
        <h2
          ref={title}
          className="font-bold text-txt text-4xl mb-8 scramble-text"
        >
          Experience
        </h2>
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
    </section>
  );
}
