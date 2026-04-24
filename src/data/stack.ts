import type { ComponentType, SVGProps } from "react";

import AwsLogo from "@/components/stack/AwsLogo";
import AzureDevOpsLogo from "@/components/stack/AzureDevOpsLogo";
import ClaudeLogo from "@/components/stack/ClaudeLogo";
import DockerLogo from "@/components/stack/DockerLogo";
import ExpressLogo from "@/components/stack/ExpressLogo";
import FigmaLogo from "@/components/stack/FigmaLogo";
import FlutterLogo from "@/components/stack/FlutterLogo";
import JavaLogo from "@/components/stack/JavaLogo";
import KafkaLogo from "@/components/stack/KafkaLogo";
import MongoLogo from "@/components/stack/MongoLogo";
import NestLogo from "@/components/stack/NestLogo";
import NextLogo from "@/components/stack/NextLogo";
import NodeLogo from "@/components/stack/NodeLogo";
import PostgresLogo from "@/components/stack/PostgresLogo";
import PrismaLogo from "@/components/stack/PrismaLogo";
import RabbitmqLogo from "@/components/stack/RabbitmqLogo";
import ReactLogo from "@/components/stack/ReactLogo";
import ReactNativeLogo from "@/components/stack/ReactNativeLogo";
import RedisLogo from "@/components/stack/RedisLogo";
import SpringBootLogo from "@/components/stack/SpringBootLogo";
import TailwindCSSLogo from "@/components/stack/TailwindCSSLogo";
import TypescriptLogo from "@/components/stack/TypescriptLogo";
import VueLogo from "@/components/stack/VueLogo";

export type StackItem = {
  id: string;
  name: string;
  logo: ComponentType<SVGProps<SVGSVGElement>>;
};

export const STACK = {
  aws: { id: "aws", name: "AWS", logo: AwsLogo },
  azureDevops: {
    id: "azureDevops",
    name: "Azure DevOps",
    logo: AzureDevOpsLogo,
  },
  claude: { id: "claude", name: "Claude", logo: ClaudeLogo },
  docker: { id: "docker", name: "Docker", logo: DockerLogo },
  express: { id: "express", name: "Express", logo: ExpressLogo },
  figma: { id: "figma", name: "Figma", logo: FigmaLogo },
  flutter: { id: "flutter", name: "Flutter", logo: FlutterLogo },
  java: { id: "java", name: "Java", logo: JavaLogo },
  kafka: { id: "kafka", name: "Apache Kafka", logo: KafkaLogo },
  mongo: { id: "mongo", name: "MongoDB", logo: MongoLogo },
  nest: { id: "nest", name: "NestJS", logo: NestLogo },
  next: { id: "next", name: "Next.js", logo: NextLogo },
  node: { id: "node", name: "Node.js", logo: NodeLogo },
  postgres: { id: "postgres", name: "PostgreSQL", logo: PostgresLogo },
  prisma: { id: "prisma", name: "Prisma", logo: PrismaLogo },
  rabbitmq: { id: "rabbitmq", name: "RabbitMQ", logo: RabbitmqLogo },
  react: { id: "react", name: "React", logo: ReactLogo },
  reactNative: {
    id: "reactNative",
    name: "React Native",
    logo: ReactNativeLogo,
  },
  redis: { id: "redis", name: "Redis", logo: RedisLogo },
  springBoot: { id: "springBoot", name: "Spring Boot", logo: SpringBootLogo },
  tailwind: { id: "tailwind", name: "Tailwind CSS", logo: TailwindCSSLogo },
  typescript: { id: "typescript", name: "TypeScript", logo: TypescriptLogo },
  vue: { id: "vue", name: "Vue.js", logo: VueLogo },
} as const satisfies Record<string, StackItem>;

export type StackId = keyof typeof STACK;
