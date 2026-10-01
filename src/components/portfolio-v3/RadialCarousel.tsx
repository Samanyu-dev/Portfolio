"use client";
import "./styles/RadialCarousel.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import dynamic from "next/dynamic";
const FloatingModel = dynamic(() => import("./FloatingModel"), { ssr: false });
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { track } from "@/lib/track";

gsap.registerPlugin(ScrollTrigger);

export type WheelItem = {
  title: string;
  badge: string;
  description: string;
  image?: string;
  href?: string;
  study?: string; // case-study page, shown on hover
  github?: string; // secondary link, shown on hover
  external?: boolean;
  hue?: number; // fallback gradient hue when there is no image
};

// Cards sit on a big circle whose centre is below the viewport; scrolling rotates
// the circle so the cards sweep through the visible upper arc (pinned section).
const RadialCarousel = ({ id, heading, accent, items, model, modelScale, extra, kind }: {
  model?: string; modelScale?: number; extra?: { src: string; scale?: number; anim?: string; spin?: boolean }; kind: "project" | "hackathon";
  id: string; heading: string; accent: string; items: WheelItem[];
}) => {
  const root = useRef<HTMLElement>(null);
  const wheel = useRef<HTMLUListElement>(null);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const { ref: viewRef } = useInView({ triggerOnce: true, threshold: 0.3, onChange: (v) => v && track("section_view", id) });
  const n = items.length;
  const step = 360 / n;

  useEffect(() => {
    const ul = wheel.current;
    const sec = root.current;
    if (!ul || !sec) return;
    const cards = Array.from(ul.querySelectorAll<HTMLElement>(".rc-card"));
    const mobile = window.innerWidth < 768;
    const radius = mobile ? 330 : Math.min(560, window.innerWidth * 0.42);
    ul.style.setProperty("--r", `${radius}px`);
    // total sweep: from first card centred to last card centred
    const sweep = step * (n - 1);
    const state = { a: 0 };

    const render = () => {
      gsap.set(ul, { rotation: -state.a });
      cards.forEach((c, i) => {
        // angular distance of card i from the top (12 o'clock)
        const d = Math.abs(i * step - state.a);
        const near = Math.max(0, 1 - d / (step * 1.6));
        c.style.setProperty("--near", near.toFixed(3));
        c.classList.toggle("is-active", d < step / 2);
      });
    };
    render();

    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: `+=${n * (mobile ? 260 : 340)}`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => { state.a = self.progress * sweep; render(); },
    });
    return () => st.kill();
  }, [n, step]);

  return (
    <section className="rc-section" id={id} ref={(el) => { (root as React.MutableRefObject<HTMLElement | null>).current = el; viewRef(el); }}>
      <h2 className="rc-heading">{heading} <span>{accent}</span></h2>
      {model && <FloatingModel src={model} scale={modelScale} />}
      {extra && <FloatingModel className="fm-left" fit src={extra.src} scale={extra.scale} anim={extra.anim} spin={extra.spin} />}
      <div className="rc-mask">
        <ul className="rc-wheel" ref={wheel}>
          {items.map((it, i) => {
            const card = (
              <div className="rc-card-inner">
                <div className="rc-media">
                  {it.image && !failed[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.image} alt={it.title} loading="lazy"
                      onError={() => setFailed((f) => ({ ...f, [i]: true }))} />
                  ) : (
                    <div className="rc-fallback" style={{ ["--h" as string]: it.hue ?? (i * 47) % 360 }}>
                      {it.title.split(/[\s\-_]+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="rc-shade" />
                </div>
                <div className="rc-body">
                  <div className="rc-top">
                    <span className="rc-badge">{it.badge}</span>
                    <span className="rc-arrow"><MdOutlineArrowOutward size={12} /></span>
                  </div>
                  <div className="rc-text">
                    <h4>{it.title}</h4>
                    <p>{it.description}</p>
                    <div className="rc-line" />
                  </div>
                </div>
              </div>
            );
            return (
              <li key={it.title} className="rc-card" style={{ ["--a" as string]: `${i * step}deg` }}>
                {it.study && (
                  <Link className="rc-gh rc-study" href={it.study} onClick={() => track(`${kind}_study` as string, it.title)} data-cursor="disable">Case study</Link>
                )}
                {it.github && (
                  <a className="rc-gh" href={it.github} onClick={() => track(`${kind}_github`, it.title)} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                    <FaGithub size={12} /> Code
                  </a>
                )}
                {it.href ? (
                  it.external ? (
                    <a href={it.href} target="_blank" rel="noopener noreferrer" data-cursor="disable" onClick={() => track(`${kind}_click`, it.title)}>{card}</a>
                  ) : (
                    <Link href={it.href} data-cursor="disable" onClick={() => track(`${kind}_click`, it.title)}>{card}</Link>
                  )
                ) : <div>{card}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default RadialCarousel;
