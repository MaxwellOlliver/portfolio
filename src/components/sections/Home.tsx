import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

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
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 select-none overflow-hidden h-full">
        <div
          className={cn(
            "h-[75px] w-[850px] rounded-full",
            "bg-gradient-to-r from-[#0F3324]/25 via-[#2E996C]/60 to-[#0F3324]/25",
            "supports-firefox:from-[#2E996C]/[0.07] supports-firefox:to-[#0F3324]/[0.07] supports-firefox:h-[200px]",
            "absolute top-[10%] left-[95%] blur-[130px] -translate-y-1/2 -translate-x-1/2 rotate-180 origin-left",
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
                className="size-8 flex items-center justify-center rounded-full"
                rel="noopener noreferrer"
                key={link.href}
                data-blobity="true"
                data-blobity-magnetic="false"
              >
                <link.icon className="w-5 h-5 text-txt-secondary" />
              </a>
            ))}
          </div>
          <h1 className="font-bold text-txt text-7xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-txt-secondary">{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
