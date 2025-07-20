import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/utils/cn";

interface Experience {
  logo: string;
  role: string;
  company: string;
  date: string;
  description: string;
  points: string[];
}

export default function ExperienceCard({ data }: { data: Experience }) {
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card.current) return;

    gsap.set(card.current, { scale: 0.8, x: 100, opacity: 0 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(card.current, { scale: 1, x: 0, opacity: 1 });
        }
      });
    });

    observer.observe(card.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={card}
      className="exp-card max-w-[32rem] min-w-[32rem] grid grid-cols-[1fr_auto] gap-8 animate"
    >
      <div>
        <div
          className={cn(
            "flex items-center gap-2 p-4 rounded-xl border-1 border-txt-secondary/20 w-fit",
            "bg-gradient-to-bl from-transparent via-white/5 to-transparent aspect-square w-[4rem] h-[4rem]"
          )}
          style={{
            maskImage:
              "linear-gradient(225deg, rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 120%), linear-gradient(45deg, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
            maskComposite: "intersect",
          }}
        >
          <Image
            src={data.logo}
            alt={data.company}
            className="size-8 object-contain"
          />
        </div>
        <div className="w-px h-[calc(100%-4rem)] bg-txt-secondary/10 mx-auto"></div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl">{data.role}</h3>
        <p className="text-primary">{data.company}</p>
        <p className="text-txt-secondary mb-4">{data.date}</p>
        <p className=" mb-4">{data.description}</p>
        <div className="flex flex-col gap-2">
          {data.points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary [clip-path:polygon(100%_50%,0_0,0_100%)]"></div>
              <span className="text-txt-secondary">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
