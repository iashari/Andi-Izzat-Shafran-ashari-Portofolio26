import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "A. Izzat Shafran Ashari - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                backgroundColor: "#262626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              JAT
            </div>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              textAlign: "center",
              margin: "0",
              lineHeight: "1.1",
            }}
          >
            A. Izzat Shafran Ashari
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#737373",
              textAlign: "center",
              margin: "0",
              marginTop: "8px",
            }}
          >
            Graphic Designer & Full Stack Developer
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            {["React", "Next.js", "TypeScript", "UI/UX", "Figma"].map(
              (skill) => (
                <div
                  key={skill}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#262626",
                    borderRadius: "999px",
                    fontSize: "18px",
                    color: "#a3a3a3",
                  }}
                >
                  {skill}
                </div>
              )
            )}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#525252",
              fontSize: "16px",
            }}
          >
            <span>LKS National Medalion of Excellence Winner</span>
            <span>|</span>
            <span>Indonesia</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
