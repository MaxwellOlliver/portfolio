import type { ComponentType, CSSProperties } from "react";

import ClaudeLogo from "../logos/ClaudeLogo";
import DockerLogo from "../logos/DockerLogo";
import FigmaLogo from "../logos/FigmaLogo";
import FlutterLogo from "../logos/FlutterLogo";
import JavaLogo from "../logos/JavaLogo";
import KafkaLogo from "../logos/KafkaLogo";
import NestLogo from "../logos/NestLogo";
import NextLogo from "../logos/NextLogo";
import NodeLogo from "../logos/NodeLogo";
import PrismaLogo from "../logos/PrismaLogo";
import ReactLogo from "../logos/ReactLogo";
import SpringBootLogo from "../logos/SpringBootLogo";
import TailwindCSSLogo from "../logos/TailwindCSSLogo";
import TypescriptLogo from "../logos/TypescriptLogo";
import VueLogo from "../logos/VueLogo";

type LogoComponent = ComponentType<{ className?: string }>;

interface Ring {
  radius: number;
  duration: number;
  size: number;
  reverse?: boolean;
  logos: LogoComponent[];
}

const rings: Ring[] = [
  {
    radius: 140,
    duration: 32,
    size: 44,
    logos: [ReactLogo, NextLogo, TypescriptLogo, NodeLogo],
  },
  {
    radius: 230,
    duration: 52,
    size: 48,
    reverse: true,
    logos: [JavaLogo, SpringBootLogo, KafkaLogo, DockerLogo, PrismaLogo],
  },
  {
    radius: 330,
    duration: 74,
    size: 44,
    logos: [
      TailwindCSSLogo,
      VueLogo,
      FlutterLogo,
      FigmaLogo,
      NestLogo,
      ClaudeLogo,
    ],
  },
];

const orbitAnimation = (
  duration: number,
  reverse?: boolean,
): CSSProperties => ({
  animationName: reverse ? "orbit-counter-spin" : "orbit-spin",
  animationDuration: `${duration}s`,
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
});

const counterAnimation = (
  duration: number,
  reverse?: boolean,
): CSSProperties => ({
  animationName: reverse ? "orbit-spin" : "orbit-counter-spin",
  animationDuration: `${duration}s`,
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
});

export default function OrbitingTech() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none motion-reduce:hidden opacity-0"
      aria-hidden="true"
      style={{
        animation: "orbit-fade-in 1.4s ease-out 0.4s forwards",
        maskImage:
          "radial-gradient(circle at center, rgb(0,0,0) 40%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0) 95%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, rgb(0,0,0) 40%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0) 95%)",
      }}
    >
      <div className="relative scale-90 md:scale-90 lg:scale-100">
        {rings.map(({ radius, duration, reverse, size, logos }, ringIdx) => (
          <div
            key={ringIdx}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              ...orbitAnimation(duration, reverse),
            }}
          >
            <div className="absolute inset-0 rounded-full border border-foreground/5" />
            {logos.map((Logo, i) => {
              const angle = (360 / logos.length) * i;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-0 h-0"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_20px_-8px_rgba(0,0,0,0.3)]"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      translate: "-50% -50%",
                      ...counterAnimation(duration, reverse),
                    }}
                  >
                    <Logo className="w-1/2 h-1/2 opacity-70" />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
