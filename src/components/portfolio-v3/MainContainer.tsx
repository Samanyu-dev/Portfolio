"use client";
import { PropsWithChildren, useEffect, useState } from "react";
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
import NetworkBackdrop from "./NetworkBackdrop";
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
      <NetworkBackdrop />
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
