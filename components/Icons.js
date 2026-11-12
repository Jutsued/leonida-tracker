// components/Icons.js
// Every icon in the app lives here as a tiny inline SVG (no icon library, no emoji).
// They all draw with `currentColor`, so an icon takes on whatever text color its
// parent has: ash when idle, bone on hover, teal when active.

function Svg({ size = 16, className = "", children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      // Decorative: the button or link next to it already has a text label.
      aria-hidden="true"
      focusable="false"
      // `.icon` (globals.css) locks the stroke at exactly 1.5px at any size.
      className={`icon shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </Svg>
  );
}

export function IconDownload(props) {
  return (
    <Svg {...props}>
      <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 20h14" />
    </Svg>
  );
}

export function IconUpload(props) {
  return (
    <Svg {...props}>
      <path d="M12 15V4M7.5 8.5L12 4l4.5 4.5M5 20h14" />
    </Svg>
  );
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

// Brand mark: a survey-grid crosshair, nodding to nautical charts and plotting maps.
export function IconMark(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" />
      <circle cx="12" cy="12" r="2" />
    </Svg>
  );
}

function IconMission(props) {
  return (
    <Svg {...props}>
      <path d="M5.5 21V3.5M5.5 4h12l-2.5 4.5L17.5 13h-12" />
    </Svg>
  );
}

function IconCollectible(props) {
  return (
    <Svg {...props}>
      <path d="M12 3l7.5 9-7.5 9-7.5-9z" />
      <path d="M4.5 12h15" />
    </Svg>
  );
}

function IconJump(props) {
  return (
    <Svg {...props}>
      <path d="M3 19.5h18M3 19.5l9-6v6" />
      <path d="M13.5 9.5c2-3.5 5-4 7-2.5" />
    </Svg>
  );
}

function IconVehicle(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 16.5v-4l2.5-5h12l2.5 5v4z" />
      <path d="M3.5 12.5h17" />
      <circle cx="7.5" cy="16.5" r="1.75" />
      <circle cx="16.5" cy="16.5" r="1.75" />
    </Svg>
  );
}

function IconProperty(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 11L12 4l8.5 7M6 9v11.5h12V9" />
      <path d="M10 20.5v-5h4v5" />
    </Svg>
  );
}

// Lets data/gta6Data.js refer to icons by a string ("mission") instead of
// importing React components into a plain data file.
const CATEGORY_ICONS = {
  mission: IconMission,
  collectible: IconCollectible,
  jump: IconJump,
  vehicle: IconVehicle,
  property: IconProperty,
};

export function CategoryIcon({ name, ...props }) {
  const Icon = CATEGORY_ICONS[name] || IconCollectible;
  return <Icon {...props} />;
}
