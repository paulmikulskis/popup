function Noise({ opacity }: { opacity: number }) {
  return (
    <div className="noise-container absolute -z-50 h-max w-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 800 800"
        width="100%"
        height="100%"
      >
        <defs>
          <filter
            id="nnnoise-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="linearRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.102"
              numOctaves="4"
              seed="15"
              stitchTiles="stitch"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              result="turbulence"
            ></feTurbulence>
            <feSpecularLighting
              surfaceScale="15"
              specularConstant="0.75"
              specularExponent="20"
              lightingColor="#7957A8"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="turbulence"
              result="specularLighting"
            >
              <feDistantLight azimuth="3" elevation="100"></feDistantLight>
            </feSpecularLighting>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="transparent"></rect>
        <rect
          width="100%"
          height="100%"
          fill="#7957a8"
          filter="url(#nnnoise-filter)"
          opacity={opacity}
        ></rect>
      </svg>
    </div>
  );
}

export default Noise;
