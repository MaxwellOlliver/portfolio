"use client";
import useBlobity from "blobity/lib/react/useBlobity";
import { useEffect } from "react";
import { initialBlobityOptions } from "@/config/blobity";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";

const HomeSection = dynamic(() => import("@/components/sections/Home"));
const AboutMeSection = dynamic(() => import("@/components/sections/AboutMe"));

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
      <AboutMeSection />
    </div>
  );
}
