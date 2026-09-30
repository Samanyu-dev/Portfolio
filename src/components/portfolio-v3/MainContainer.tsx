"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Hackathons from "./Hackathons";
import ChessArena from "./ChessArena";
import GithubHeatmap from "./GithubHeatmap";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import Blog from "./Blog";
import "./styles/pop.css";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const bgRef = useRef<HTMLDivElement>(null);

  // "drift" device: the backdrop pans from pink sky to dots to clouds as you scroll
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bgRef.current?.style.setProperty("--bgy", `${(p * 100).toFixed(1)}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    setIsDesktopView(window.innerWidth > 1024);
    setIsMobile(window.innerWidth <= 768);
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main pop">
      <div className="pop-bg" ref={bgRef} />
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && !isMobile && children}
      <div className="container-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <Hackathons />
        <GithubHeatmap />
        <ChessArena />
        <div id="skills-wrap"><TechStackNew /></div>
        <Blog />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
