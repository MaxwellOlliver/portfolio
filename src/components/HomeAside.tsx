import { cn } from "@/utils/cn";
import ReactLogo from "./logos/ReactLogo";
import NodeLogo from "./logos/NodeLogo";

export default function HomeAside() {
  const data = [
    ReactLogo,
    NodeLogo,
    ReactLogo,
    ReactLogo,
    ReactLogo,
    ReactLogo,
    ReactLogo,
    ReactLogo,
    ReactLogo,
  ];
  return (
    <>
      <div
        className={cn(
          "absolute top-[25%] left-1/2 w-[800px] h-full",
          "rounded-md p-4 grid grid-cols-3 gap-4 [transform-style:preserve-3d] [transform:rotateX(45deg)_rotateZ(45deg)] will-change-transform",
          "perspective-distant"
        )}
      >
        {data.map((Item, index) => (
          <div
            key={index}
            className={cn(
              "rounded-md  text-white text-center cursor-pointer hover:border-neutral-800 [transform-style:preserve-3d]",
              "flex items-center justify-center hover:ring-1 hover:ring-neutral-800/70 text-sm text-neutral-600/70 perspective-distant"
            )}
          >
            <div className="flex rounded-md group items-center transition-all duration-300 border-1 border-neutral-800/70 justify-center w-full h-full hover:translate-z-4">
              <Item
                className={cn(
                  "size-14 transition-all duration-300",
                  Item.name === "ReactLogo" && "group-hover:fill-[#61dafb]",
                  Item.name === "NodeLogo" && "group-hover:fill-[#00d486]"
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
