"use client";
import useBlobity from "blobity/lib/react/useBlobity";
import { useEffect } from "react";
import { initialBlobityOptions } from "@/config/blobity";
import Navbar from "@/components/layout/Navbar";
import HomeSection from "@/components/sections/Home";
import HorizontalScroll from "@/components/layout/HorizontalScroll";
import AboutMeSection from "@/components/sections/AboutMe";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default function Home() {
  const blobityInstance = useBlobity(initialBlobityOptions);

  useEffect(() => {
    if (blobityInstance.current && typeof window !== "undefined") {
      window.blobity = blobityInstance.current;
    }
  }, [blobityInstance]);

  if (typeof window === "undefined") return null;

  return (
    <div className="w-full min-h-dvh font-[family-name:var(--font-geist-sans)] relative">
      <Navbar />
      <HomeSection />
      <HorizontalScroll>
        <AboutMeSection />
        <ExperienceSection />
      </HorizontalScroll>
    </div>
  );
}
