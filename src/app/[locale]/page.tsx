"use client";
import useBlobity from "blobity/lib/react/useBlobity";
import { useEffect } from "react";

import HorizontalScroll from "@/components/layout/HorizontalScroll";
import Navbar from "@/components/layout/Navbar";
import AboutMeSection from "@/components/sections/AboutMe";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FooterSection from "@/components/sections/FooterSection";
import HomeSection from "@/components/sections/Home";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { initialBlobityOptions } from "@/config/blobity";

export default function Home() {
  const blobityInstance = useBlobity(initialBlobityOptions);

  useEffect(() => {
    if (blobityInstance.current && typeof window !== "undefined") {
      window.blobity = blobityInstance.current;
    }
  }, [blobityInstance]);

  return (
    <div className="w-full min-h-dvh font-[family-name:var(--font-geist-sans)] relative">
      <Navbar />
      <HomeSection />
      <HorizontalScroll>
        <AboutMeSection />
        <ExperienceSection />
      </HorizontalScroll>
      <ProjectsSection />
      <FooterSection />
    </div>
  );
}
