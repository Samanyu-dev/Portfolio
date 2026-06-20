"use client";

import MainContainer from "@/components/portfolio-v3/MainContainer";
import CharacterModel from "@/components/portfolio-v3/Character";
import { useEffect, useState } from "react";

import { LoadingProvider } from "@/context-v3/LoadingProvider";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <LoadingProvider>
      <MainContainer>
        <CharacterModel />
      </MainContainer>
    </LoadingProvider>
  );
}
