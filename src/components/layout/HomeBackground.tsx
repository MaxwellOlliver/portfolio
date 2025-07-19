import { cn } from "@/utils/cn";
import ReactLogo from "../logos/ReactLogo";
import NodeLogo from "../logos/NodeLogo";
import VueLogo from "../logos/VueLogo";
import FigmaLogo from "../logos/FigmaLogo";
import TailwindCSSLogo from "../logos/TailwindCSSLogo";
import PrismaLogo from "../logos/PrismaLogo";
import TypescriptLogo from "../logos/TypescriptLogo";
import FlutterLogo from "../logos/FlutterLogo";
import GridSvg from "./GridSvg";

export default function HomeBackground() {
  const data = [
    ReactLogo,
    NodeLogo,
    VueLogo,
    FigmaLogo,
    TailwindCSSLogo,
    PrismaLogo,
    TypescriptLogo,
    FlutterLogo,
    ReactLogo,
    NodeLogo,
    VueLogo,
    FigmaLogo,
    TailwindCSSLogo,
    PrismaLogo,
    TypescriptLogo,
    FlutterLogo,
    NodeLogo,
    VueLogo,
    FigmaLogo,
    TailwindCSSLogo,
    PrismaLogo,
    TypescriptLogo,
    FlutterLogo,
    NodeLogo,
  ];
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 90%)",
        maskComposite: "intersect",
      }}
    >
      <div
        className="absolute top-0 left-0 max-w-screen w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0) 60%)",
          maskComposite: "intersect",
        }}
      >
        <GridSvg className="w-full h-full text-neutral-800/30" />
      </div>
      <div
        className={cn(
          "absolute top-[35%] left-1/2 max-w-[800px] w-full",
          "rounded-md p-4 grid grid-rows-4 grid-flow-col gap-4 [transform-style:preserve-3d] [transform:rotateX(45deg)_rotateZ(45deg)] will-change-transform",
          "perspective-[1000px] w-full"
        )}
        style={{
          aspectRatio: "984 / 802",
          maskImage:
            "linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 120%), linear-gradient(to right, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
          maskComposite: "intersect",
        }}
      >
        {data.map((Item, index) => (
          <div
            key={index}
            className={cn(
              "rounded-md group text-center cursor-pointer [transform-style:preserve-3d]",
              "flex items-center justify-center w-52 ring-1 ring-neutral-800/90 text-sm perspective-distant"
            )}
          >
            <div
              className={cn(
                "grayscale-100 group-hover:grayscale-0",
                "flex rounded-md items-center justify-center w-full h-full",
                "transition-all duration-300",
                "border-1 border-transparent group-hover:border-neutral-800/90",
                "group-hover:[transform:translateX(-15px)_translateY(-15px)]"
              )}
            >
              <Item
                className={cn(
                  "size-14 transition-all duration-300 opacity-20 group-hover:opacity-100 "
                )}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <div
          className={cn(
            "absolute top-[35%] left-1/2 w-[800px] h-full",
            "rounded-md p-4 perspective-distant grid grid-cols-3 gap-4 transform-3d "
          )}
          style={{
            transform: "rotateX(45deg) rotateZ(45deg)",
          }}
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className=" bg-neutral-900/20 rounded-md"></div>
          ))}
        </div> */}
    </div>
  );
}
