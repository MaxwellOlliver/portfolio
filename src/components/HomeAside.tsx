import { cn } from "@/utils/cn";
import ReactLogo from "./logos/ReactLogo";
import NodeLogo from "./logos/NodeLogo";
import VueLogo from "./logos/VueLogo";
import FigmaLogo from "./logos/FigmaLogo";
import TailwindCSSLogo from "./logos/TailwindCSSLogo";
import PrismaLogo from "./logos/PrismaLogo";
import TypescriptLogo from "./logos/TypescriptLogo";
import FlutterLogo from "./logos/FlutterLogo";
import GridSvg from "./GridSvg";

export default function HomeAside() {
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
  ];
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgb(0, 0, 0) 30%, rgba(0, 0, 0, 0) 60%)",
          maskComposite: "intersect",
        }}
      >
        <GridSvg className="w-full h-full opacity-[65%]" />
      </div>
      <div
        className={cn(
          "absolute top-[45%] left-1/2 w-[1500px] h-[600px]",
          "rounded-md p-4 grid grid-cols-6 gap-4 [transform-style:preserve-3d] [transform:rotateX(45deg)_rotateZ(45deg)] will-change-transform",
          "perspective-[1000px]"
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
              "flex items-center justify-center ring-1 ring-neutral-800/70 text-sm perspective-distant"
            )}
          >
            <div className="grayscale-100  group-hover:grayscale-0 flex rounded-md group items-center transition-all duration-300 group-hover:border-1 border-neutral-800/70 justify-center w-full h-full group-hover:[transform:translateX(-15px)_translateY(-15px)] ">
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
    </>
  );
}
