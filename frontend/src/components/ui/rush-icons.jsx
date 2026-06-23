import { useReducedMotion } from 'framer-motion';

/*
  Cinematic animated line icons for the Rush Hour pain cards (v2).
  Stroke = currentColor, so they inherit the badge colour (wine → gold on hover).
  Looping motion is CSS-driven (see rushhour.css); the gauge needle uses SMIL
  <animateTransform>, dropped when the user prefers reduced motion.
*/

const SVG = {
  className: 'rh-ic-svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

/* Rush-hour pressure — pressure gauge with a swinging needle */
export function GaugeIcon() {
  const reduce = useReducedMotion();
  return (
    <svg {...SVG}>
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M5.5 13.2l1.2.8M12 8.4v1.4M18.5 13.2l-1.2.8" opacity=".45" />
      <circle cx="12" cy="17" r="1.3" fill="currentColor" stroke="none" />
      <line x1="12" y1="17" x2="12" y2="9.5">
        {!reduce ? (
          <animateTransform
            attributeName="transform" type="rotate"
            values="-62 12 17; 64 12 17; -62 12 17"
            keyTimes="0;0.5;1" calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
            dur="2.2s" repeatCount="indefinite"
          />
        ) : (
          <animateTransform attributeName="transform" type="rotate" values="40 12 17" dur="0s" fill="freeze" />
        )}
      </line>
    </svg>
  );
}

/* Prep & flame delays — pot with rising steam */
export function PotIcon() {
  return (
    <svg {...SVG} className="rh-ic-svg rh-pot">
      <g>
        <path className="rh-steam rh-steam-1" d="M9 8.5q-1.4-1.4 0-2.8t0-2.8" />
        <path className="rh-steam rh-steam-2" d="M12 8.5q-1.4-1.4 0-2.8t0-2.8" />
        <path className="rh-steam rh-steam-3" d="M15 8.5q-1.4-1.4 0-2.8t0-2.8" />
      </g>
      <path d="M4 11h16" />
      <path d="M11 8.6h2" />
      <path d="M5 11h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z" />
      <path d="M5 13.2H3M19 13.2h2" />
    </svg>
  );
}

/* Labour dependency — bobbing chef's hat */
export function ChefHatIcon() {
  return (
    <svg {...SVG} className="rh-ic-svg rh-hat">
      <path d="M17.5 17a4 4 0 0 0 .9-7.9 4 4 0 0 0-7.8-1.3A3.6 3.6 0 0 0 6 9.9 3.6 3.6 0 0 0 6.5 17z" />
      <path d="M7 20h10v-3H7z" />
      <path d="M9.5 17v3M14.5 17v3" opacity=".55" />
    </svg>
  );
}

/* Wastage & cost — declining bar chart */
export function BarsIcon() {
  return (
    <svg {...SVG}>
      <path d="M3 20h18" />
      <rect className="rh-bar rh-bar-1" x="4.5" y="6" width="3.5" height="11" rx="1" />
      <rect className="rh-bar rh-bar-2" x="10.25" y="9.5" width="3.5" height="7.5" rx="1" />
      <rect className="rh-bar rh-bar-3" x="16" y="12.5" width="3.5" height="4.5" rx="1" />
    </svg>
  );
}
