import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const alt = "Agustin Galeazzi — Diseñador Web & Multimedial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const tags = ["Portfolio 2025", "UI / UX Design", "Next.js", "Frontend Dev", "Figma"];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: 200,
            width: 600,
            height: 600,
            background:
              "radial-gradient(ellipse, rgba(200,169,110,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* left */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                background: "#c8a96e",
                borderRadius: "50%",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              La Plata, Argentina
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#f9f8f6",
              marginBottom: 24,
            }}
          >
            <span>Agustin</span>
            <span>Galeazzi</span>
          </div>

          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#c8a96e",
            }}
          >
            Diseñador Web & Multimedial
          </span>
        </div>

        {/* right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 12,
          }}
        >
          {tags.map((tag, i) => (
            <div
              key={tag}
              style={{
                border: `1px solid ${i === 0 ? "rgba(200,169,110,0.4)" : "rgba(255,255,255,0.15)"}`,
                padding: "8px 20px",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: i === 0 ? "#c8a96e" : "rgba(255,255,255,0.5)",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(to right, transparent, #c8a96e 30%, #c8a96e 70%, transparent)",
            opacity: 0.6,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
