import type { StaticImageData } from "next/image";

import DotcodeLogo from "../../public/assets/companies/dotcode.jpeg";
import GBAgritechLogo from "../../public/assets/companies/gbagritech.jpeg";
import VivinhoLogo from "../../public/assets/companies/vivo.png";
import VyaDigitalLogo from "../../public/assets/companies/vyadigital.jpeg";
import { STACK, type StackItem } from "./stack";

export type ExperienceConfig = {
  key: string;
  logo: string | StaticImageData;
  startDate: string;
  endDate: string | "present";
  tech: StackItem[];
  current?: boolean;
};

export const experiencesConfig: ExperienceConfig[] = [
  {
    key: "dotcodeSenior",
    logo: DotcodeLogo,
    startDate: "2025-09",
    endDate: "present",
    tech: [
      STACK.react,
      STACK.reactNative,
      STACK.next,
      STACK.typescript,
      STACK.docker,
    ],
    current: true,
  },
  {
    key: "vivo",
    logo: VivinhoLogo,
    startDate: "2025-02",
    endDate: "2025-09",
    tech: [
      STACK.react,
      STACK.flutter,
      STACK.next,
      STACK.typescript,
      STACK.node,
      STACK.nest,
      STACK.docker,
      STACK.java,
      STACK.springBoot,
      STACK.postgres,
      STACK.mongo,
    ],
  },
  {
    key: "dotcodeFrontend",
    logo: DotcodeLogo,
    startDate: "2023-06",
    endDate: "2025-01",
    tech: [STACK.react, STACK.typescript, STACK.docker],
  },
  {
    key: "gbAgritech",
    logo: GBAgritechLogo,
    startDate: "2022-06",
    endDate: "2023-05",
    tech: [STACK.next, STACK.react, STACK.typescript],
  },
  {
    key: "vyaDigital",
    logo: VyaDigitalLogo,
    startDate: "2021-01",
    endDate: "2022-10",
    tech: [
      STACK.react,
      STACK.typescript,
      STACK.node,
      STACK.express,
      STACK.postgres,
    ],
  },
];
