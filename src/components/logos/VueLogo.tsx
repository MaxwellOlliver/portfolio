import * as React from "react";
const VueLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={2500}
    height={2158}
    preserveAspectRatio="xMinYMin meet"
    viewBox="0 0 256 221"
    {...props}
  >
    <path
      fill="#41B883"
      d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36z"
    />
    <path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0z" />
    <path
      fill="#35495E"
      d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56z"
    />
  </svg>
);
export default VueLogo;
