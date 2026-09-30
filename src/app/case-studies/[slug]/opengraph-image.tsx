import { ImageResponse } from "next/og";
import { caseStudies } from "@/data/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() { return caseStudies.map((c) => ({ slug: c.slug })); }

// Pop-art share card: pink/orange backdrop, hard black shadows, rank + headline stats.
export default function Image({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  const title = c?.title ?? "Case study";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64,
        background: "linear-gradient(160deg,#ff1f8e 0%,#ff8a00 100%)", fontFamily: "sans-serif", border: "14px solid #000" }}>
        <div style={{ display: "flex", background: "#000", color: "#fff", fontSize: 32, padding: "8px 24px", alignSelf: "flex-start", transform: "rotate(-2deg)" }}>
          {c?.result ?? "Samanyu Allipuram"}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 900, lineHeight: 1.02, color: "#ffe600", textShadow: "8px 8px 0 #000", maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", gap: 20 }}>
          {(c?.stats ?? []).slice(0, 3).map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", background: "#fff", border: "5px solid #000", borderRadius: 18, padding: "10px 26px", boxShadow: "8px 8px 0 #000" }}>
              <div style={{ fontSize: 46, fontWeight: 900 }}>{s.value}</div><div style={{ fontSize: 22 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
