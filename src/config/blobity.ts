import { Options } from "blobity/lib/Blobity";

export const initialBlobityOptions: Partial<Options> = {
  licenseKey: "opensource",
  focusableElementsOffsetX: 5,
  focusableElementsOffsetY: 5,
  color: "#e4ded7",
  dotColor: "#008170",
  invert: true,
  focusableElements:
    "[data-blobity], a:not([data-no-blobity]), h4:not([data-no-blobity]), li:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",
  font: "'Inter','Source Sans Pro',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
  fontSize: 16,
  fontWeight: 500,
  opacity: 1,
  fontColor: "#0e1016",
  zIndex: 100,
  size: 40,
  radius: 4,
  magnetic: true,
};
