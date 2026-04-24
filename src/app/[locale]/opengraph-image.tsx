import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Maxwell Macedo";

const FONT_TEXT =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,;:!?'\"-_/()[]&|áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇñÑ";

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format/);
  if (!match) throw new Error(`failed to load ${family} ${weight}`);
  const fontResp = await fetch(match[1]);
  if (!fontResp.ok) throw new Error(`failed to fetch font file for ${family}`);
  return fontResp.arrayBuffer();
}

const CONTRIB_PATTERN = [
  0, 1, 2, 1, 0, 2, 3, 4, 2, 1, 0, 1, 3, 2, 1, 4, 3, 2,
];
const CONTRIB_COLORS = ["#d8d8d8", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const meta = await getTranslations({ locale, namespace: "meta" });
  const home = await getTranslations({ locale, namespace: "home" });

  const title = meta("ogTitle");
  const subtitle = meta("ogSubtitle");
  const status = home("status");

  const [interRegular, interBold] = await Promise.all([
    loadGoogleFont("Inter", 400, FONT_TEXT),
    loadGoogleFont("Inter", 700, FONT_TEXT),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ebebeb",
          padding: "72px",
          fontFamily: "Inter",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(46,46,46,0.10) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: 22,
            color: "#646464",
            letterSpacing: "5px",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          <span>maxwellmacedo.com</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "#2e2e2e",
              }}
            />
            <span>{status}</span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              color: "#2e2e2e",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 44,
              color: "#646464",
              marginTop: 24,
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 4 }}>
          {CONTRIB_PATTERN.map((intensity, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                backgroundColor: CONTRIB_COLORS[intensity],
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    },
  );
}

