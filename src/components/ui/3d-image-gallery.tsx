"use client";

import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, OrbitControls, Plane, Sphere } from "@react-three/drei";
import { ExternalLink, GitBranch, X } from "lucide-react";
import Link from "next/link";
import { getProjectImageUrl } from "@/lib/project-image";
import type { PortfolioProject } from "@/types/portfolio-v2";

type GalleryCard = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  project: PortfolioProject;
};

type CardContextType = {
  selectedCard: GalleryCard | null;
  setSelectedCard: (card: GalleryCard | null) => void;
  cards: GalleryCard[];
};

const CardContext = createContext<CardContextType | undefined>(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}

function CardProvider({ cards, children }: { cards: GalleryCard[]; children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<GalleryCard | null>(null);
  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  );
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x050508, 1);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    resize();

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 8000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    camera.position.z = 10;

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;
      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("resize", resize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 bg-[#050508]" aria-hidden />;
}

function FloatingCard({
  card,
  position
}: {
  card: GalleryCard;
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedCard } = useCard();

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position);
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[4.5, 6]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedCard(card);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          pointerEvents: "none"
        }}
      >
        <div
          className="w-44 select-none overflow-hidden rounded-lg bg-[#12141a] p-3 shadow-2xl"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(37, 99, 235, 0.45), 0 0 30px rgba(37, 99, 235, 0.25)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(37, 99, 235, 0.55)" : "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="h-44 w-full rounded-md object-cover"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="truncate text-xs font-medium text-white">{card.title}</p>
            <p className="text-[10px] text-white/50">#{card.project.rank} · {card.project.category}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selectedCard) return null;

  const project = selectedCard.project;

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 15;
    const rotateY = (rect.width / 2 - x) / 15;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedCard(null);
      }}
    >
      <div className="relative mx-4 w-full max-w-md">
        <button
          type="button"
          onClick={() => setSelectedCard(null)}
          className="absolute -top-12 right-0 z-10 text-white transition hover:text-white/70"
          aria-label="Close"
        >
          <X className="h-8 w-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative w-full cursor-pointer rounded-2xl bg-[#1F2121] p-4 transition-all duration-500"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative mb-4 w-full" style={{ aspectRatio: "3 / 4" }}>
              <img
                src={selectedCard.imageUrl}
                alt={selectedCard.alt}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>

            <h3 className="text-center text-lg font-semibold text-white">{project.name}</h3>
            <p className="mt-2 text-center text-sm text-white/70 line-clamp-3">{project.description}</p>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand-b text-sm font-semibold text-white transition hover:bg-brand-a"
              >
                <GitBranch className="h-4 w-4" />
                Repository
              </a>
              {project.frontend ? (
                <a
                  href={project.frontend.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/20 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live
                </a>
              ) : null}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-3 block text-center text-xs text-blue-300 hover:underline"
              onClick={() => setSelectedCard(null)}
            >
              Full project details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardGalaxy() {
  const { cards } = useCard();

  const cardPositions = useMemo(() => {
    const positions: {
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
    }[] = [];
    const numCards = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = numCards === 1 ? 0 : 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 8 + (i % 4) * 2.5;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2
      });
    }
    return positions;
  }, [cards]);

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2563eb" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2563eb" transparent opacity={0.03} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  );
}

function projectsToCards(projects: PortfolioProject[]): GalleryCard[] {
  return projects.map((project) => ({
    id: project.slug,
    imageUrl: getProjectImageUrl(project),
    alt: project.name,
    title: project.name,
    project
  }));
}

type ProjectStellarGalleryProps = {
  projects: PortfolioProject[];
  className?: string;
  fullPage?: boolean;
};

export function ProjectStellarGallery({ projects, className, fullPage = false }: ProjectStellarGalleryProps) {
  const cards = useMemo(() => projectsToCards(projects), [projects]);

  if (cards.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-line bg-card text-text-2">
        No projects to display.
      </div>
    );
  }

  return (
    <CardProvider cards={cards}>
      <div
        className={
          fullPage
            ? `absolute inset-0 h-full w-full overflow-hidden bg-[#050508] ${className ?? ""}`
            : `relative h-[min(85vh,720px)] w-full overflow-hidden rounded-2xl border border-line ${className ?? ""}`
        }
      >
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 12], fov: 55 }}
          className="absolute inset-0 z-10 touch-none"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto";
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={4}
              maxDistance={28}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        {!fullPage ? (
          <div className="pointer-events-none absolute left-4 top-4 z-20 text-white">
            <p className="text-sm font-semibold">3D Project Galaxy</p>
            <p className="text-xs text-white/60">Drag · scroll to zoom · click a card</p>
          </div>
        ) : null}
      </div>
    </CardProvider>
  );
}

/** Default export alias for 21st.dev demo compatibility */
export default function StellarCardGallerySingle({ projects = [] }: { projects?: PortfolioProject[] }) {
  return <ProjectStellarGallery projects={projects} />;
}
