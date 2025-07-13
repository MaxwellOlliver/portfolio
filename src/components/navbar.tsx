import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const items = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About me",
      href: "/about",
    },
    {
      label: "Projects",
      href: "/projects",
    },
  ];

  const moreOptions = [
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Resume",
      href: "/resume",
    },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-background-secondary/50 px-2 py-1 rounded-md">
      <div className="flex items-center gap-4">
        {items.map((item) => (
          <Link href={item.href} key={item.label} className=" px-4 rounded-md">
            {item.label}
          </Link>
        ))}
        <div className="w-[1px] h-4 bg-neutral-600"></div>
        <button
          className="p-2 flex items-center gap-2 rounded-md text-neutral-500"
          data-no-blobity
        >
          More <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
