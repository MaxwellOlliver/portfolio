import { STACK, type StackItem } from "./stack";

export type ProjectConfig = {
  key: string;
  image: string;
  githubLink?: string;
  websiteLink?: string;
  backgroundColor: string;
  tools: StackItem[];
};

export const projectsConfig: ProjectConfig[] = [
  {
    key: "animora",
    image: "/assets/projects/animora.png",
    githubLink: "https://github.com/MaxwellOlliver/animora",
    backgroundColor: "#F34E7A",
    tools: [
      STACK.react,
      STACK.typescript,
      STACK.next,
      STACK.postgres,
      STACK.redis,
      STACK.rabbitmq,
    ],
  },
  {
    key: "moonly",
    image: "/assets/projects/moonly.png",
    githubLink: "https://github.com/MaxwellOlliver/moonly",
    websiteLink: "https://maxwellolliver.github.io/moonly/",
    backgroundColor: "#da7727",
    tools: [STACK.react, STACK.typescript],
  },
  {
    key: "rqselect",
    image: "/assets/projects/rqselect.png",
    githubLink: "https://github.com/MaxwellOlliver/react-query-select",
    websiteLink: "https://maxwellolliver.github.io/react-query-select/",
    backgroundColor: "oklch(72.401% .15914 163.15)",
    tools: [STACK.react, STACK.typescript],
  },
];
