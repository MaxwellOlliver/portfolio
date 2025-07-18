"use client";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import HomeBackground from "../layout/HomeBackground";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, SplitText);

export default function HomeSection() {
  const t = useTranslations("home");
  const links = [
    {
      href: "https://github.com/MaxwellOlliver",
      icon: Github,
    },
    {
      href: "https://linkedin.com/in/maxwell-macedo",
      icon: Linkedin,
    },
    {
      href: "mailto:maxwellmacedo2015@gmail.com",
      icon: Mail,
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0,
    });

    const links = gsap.utils.toArray(".social-link");
    tl.from(links, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.1,
    });
    const title = document.querySelector("#title");

    const split = new SplitText(title, {
      type: "words",
    });
    tl.from(split.words, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    const description = document.querySelector("#description");
    const split2 = new SplitText(description, {
      type: "words",
    });
    tl.from(split2.words, {
      opacity: 0,
      y: 20,
      ease: "power2.inOut",
      stagger: 0.05,
    });

    const moreAboutMe = document.querySelector("#more-about-me");
    tl.from(moreAboutMe, {
      opacity: 0,
      y: 20,
    });
  });
  return (
    <section className="relative w-full min-h-dvh overflow-visible" id="home">
      <div className="absolute inset-0 select-none h-full">
        <div
          className={cn(
            "h-[75px] w-[850px] rounded-full",
            "bg-gradient-to-r from-[#0F3324]/40 via-[#2E996C]/40 to-[#0F3324]/40",
            "supports-firefox:from-[#2E996C]/[0.07] supports-firefox:to-[#0F3324]/[0.07] supports-firefox:h-[200px]",
            "absolute top-[20%] left-[95%] blur-[130px] -translate-y-1/2  rotate-180 origin-left",
            "z-[1] pointer-events-none",
            "max-md:top-[5%]"
          )}
        ></div>

        <div
          className={cn(
            "h-[160px] w-[850px] rounded-full",
            "bg-gradient-to-r from-[#0F3324]/40 via-[#2E996C]/20 to-[#0F3324]/40",
            "supports-firefox:from-[#2E996C]/[0.07] supports-firefox:to-[#0F3324]/[0.07] supports-firefox:h-[200px]",
            "absolute top-[80%] left-[65%] blur-[130px] -translate-y-1/2 -translate-x-1/2 rotate-180 origin-left",
            "z-[1] pointer-events-none",
            "max-md:top-[5%]"
          )}
        ></div>
      </div>
      <div className="layout pt-36 pb-20 flex items-center min-h-[calc(100dvh-10rem)] relative w-full">
        <div className="flex flex-col max-w-[30rem] z-10">
          <div className="flex items-center gap-4 mb-4">
            {links.map((link) => (
              <a
                href={link.href}
                target="_blank"
                className="social-link size-8 flex items-center justify-center rounded-full"
                rel="noopener noreferrer"
                key={link.href}
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <link.icon className="w-5 h-5 text-txt-secondary" />
              </a>
            ))}
          </div>
          <h1 className="font-bold text-txt text-7xl" id="title">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-txt-secondary" id="description">
            {t("description")}
          </p>
          <a
            id="more-about-me"
            href="#about-me"
            className={cn(
              "flex items-center gap-2 mt-4 p-4 rounded-xl border-1 border-txt-secondary/20 w-fit",
              "bg-gradient-to-bl from-transparent via-white/5 to-transparent"
            )}
            data-blobity="true"
            data-blobity-magnetic="false"
            data-blobity-offset-y="0"
            data-blobity-offset-x="0"
            data-blobity-radius="12"
            style={{
              maskImage:
                "linear-gradient(225deg, rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 120%), linear-gradient(45deg, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
              maskComposite: "intersect",
            }}
          >
            <ArrowDown className="w-5 h-5" />
            <span>More about me</span>
          </a>
        </div>
      </div>
      <HomeBackground />
    </section>
  );
}
