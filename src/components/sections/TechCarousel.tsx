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

const logos = [
  { name: "React", Logo: ReactLogo },
  { name: "TypeScript", Logo: TypescriptLogo },
  { name: "Next", Logo: NextLogo },
  { name: "Node", Logo: NodeLogo },
  { name: "Nest", Logo: NestLogo },
  { name: "Java", Logo: JavaLogo },
  { name: "Spring Boot", Logo: SpringBootLogo },
  { name: "Kafka", Logo: KafkaLogo },
  { name: "Docker", Logo: DockerLogo },
  { name: "Prisma", Logo: PrismaLogo },
  { name: "Tailwind CSS", Logo: TailwindCSSLogo },
  { name: "Vue", Logo: VueLogo },
  { name: "Flutter", Logo: FlutterLogo },
  { name: "Figma", Logo: FigmaLogo },
  { name: "Claude", Logo: ClaudeLogo },
];

const GROUP_REPEATS = 4;

function LogoGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const repeated = Array.from({ length: GROUP_REPEATS }).flatMap(() => logos);
  return (
    <ul
      className="flex items-center gap-8 pr-8 shrink-0"
      aria-hidden={ariaHidden}
    >
      {repeated.map(({ name, Logo }, idx) => (
        <li
          key={`${name}-${idx}`}
          data-blobity-tooltip={name}
          data-blobity-magnetic="false"
          className="shrink-0 flex items-center justify-center w-8 h-8 text-foreground-muted"
        >
          <Logo data-no-blobity className="w-full h-full object-contain" />
        </li>
      ))}
    </ul>
  );
}

export default function TechCarousel() {
  return (
    <section
      className="relative w-full py-8 overflow-hidden"
      id="tech-carousel"
      aria-label="Technologies"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 10%, black 30%, black 70%, transparent 90%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 10%, black 40%, black 70%, transparent 90%)",
      }}
    >
      <div className="marquee-track flex w-max items-center">
        <LogoGroup />
        <LogoGroup ariaHidden />
      </div>
    </section>
  );
}
