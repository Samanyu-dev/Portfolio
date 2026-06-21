import { ImageResponse } from "next/og";

export const alt = "Samanyu | AI + Full Stack Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px",
          color: "#f8fbff",
          background:
            "radial-gradient(circle at 16% 10%, rgba(123,223,246,0.3), transparent 42%), radial-gradient(circle at 85% 14%, rgba(99,242,212,0.22), transparent 38%), linear-gradient(160deg, #06080d, #0b101a 45%, #141c2a)"
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: "0.24em", textTransform: "uppercase", color: "#b4c6e4" }}>
          Premium Engineering Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 950 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1 }}>Samanyu Reddy Allipuram</div>
          <div style={{ fontSize: 32, lineHeight: 1.28, color: "#d7e5ff" }}>
            AI systems, full stack product builds, and cinematic interfaces with production reliability.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#c8daff" }}>
          <span>samanyuallipuram.vercel.app</span>
          <span>GitHub powered project intelligence</span>
        </div>
      </div>
    ),
    size
  );
}
