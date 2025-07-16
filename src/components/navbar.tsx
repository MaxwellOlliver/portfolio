import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const t = useTranslations("navbar");
  const items = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("about"),
      href: "/about",
    },
    {
      label: t("projects"),
      href: "/projects",
    },
  ];

  const moreOptions = [
    {
      label: t("contact"),
      href: "/contact",
    },
    {
      label: t("resume"),
      href: "/resume",
    },
  ];

  useGSAP(() => {
    const navbar = gsap.utils.toArray(".navbar");
    gsap.from(navbar, {
      opacity: 0,
      y: -50,
    });
  });

  return (
    <nav className="navbar fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-background-secondary/60 px-2 py-1 rounded-md">
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="px-4 rounded-md text-nowrap"
          >
            {item.label}
          </Link>
        ))}
        <div className="w-[1px] h-4 bg-neutral-600"></div>
        <button
          className="p-2 flex items-center gap-2 rounded-md text-neutral-500"
          data-no-blobity
        >
          {t("more")} <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
