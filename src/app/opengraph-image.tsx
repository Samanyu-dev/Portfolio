import { ImageResponse } from "next/og";

export const alt = "Samanyu interactive developer portfolio";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          color: "white",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.32), transparent 26%), radial-gradient(circle at bottom right, rgba(249,115,22,0.26), transparent 22%), linear-gradient(180deg, #050816 0%, #071225 55%, #050816 100%)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#cbd5e1"
          }}
        >
          <span>Interactive portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 1 }}>
            Samanyu
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35, color: "#dbeafe" }}>
            AI systems, mobile products, and story-led engineering shaped into one immersive journey.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#e2e8f0"
          }}
        >
          <span>GitHub-driven project chapters</span>
          <span>samanyu-portfolio.vercel.app</span>
        </div>
      </div>
    ),
    size
  );
}
