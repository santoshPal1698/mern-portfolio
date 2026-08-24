import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

/* =============================================================
   TechOrbit
   -------------------------------------------------------------
   A self-contained, reusable "photo with an orbiting ring of
   tech-stack icons" widget. Drop any content (a photo, a logo,
   an avatar) in as children, pass a `badges` array, and it
   handles: the glow ring, the dashed orbit ring, the continuous
   fast rotation, per-badge counter-rotation (so icons stay
   upright), staggered entrance, and pause-on-mouse-enter.

   Usage:
     <TechOrbit badges={MY_BADGES}>
       <img src={...} />
     </TechOrbit>

   Each badge: { id, glyph: <ReactNode/>, label, angle, tone? }
   `angle` is degrees, 0 = right, -90 = top, going clockwise.
   Use `buildEvenBadges(list)` below to auto-space angles evenly.
   ============================================================= */

/* ---------------- glyphs ---------------- */
/* Existing hand-drawn shapes for the MERN/MEAN core... */

export const ReactGlyph = () => (
  <svg viewBox="0 0 40 40" width="60%" height="60%">
    <g fill="none" stroke="#61DAFB" strokeWidth="2.4">
      <ellipse cx="20" cy="20" rx="16" ry="6.2" />
      <ellipse cx="20" cy="20" rx="16" ry="6.2" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="16" ry="6.2" transform="rotate(120 20 20)" />
    </g>
    <circle cx="20" cy="20" r="3.4" fill="#61DAFB" />
  </svg>
);

export const NodeGlyph = () => (
  <svg viewBox="0 0 40 40" width="58%" height="58%">
    <path
      d="M20 3 L35 11.5 V28.5 L20 37 L5 28.5 V11.5 Z"
      fill="none"
      stroke="#6CC24A"
      strokeWidth="2.4"
    />
    <text
      x="20"
      y="25"
      textAnchor="middle"
      fontSize="13"
      fontWeight="800"
      fill="#6CC24A"
    >
      N
    </text>
  </svg>
);

export const MongoGlyph = () => (
  <svg viewBox="0 0 40 40" width="52%" height="52%">
    <path
      d="M20 4c5 6 8 12 8 18a8 8 0 0 1-16 0c0-6 3-12 8-18Z"
      fill="#47A248"
    />
    <rect x="19" y="30" width="2" height="7" fill="#47A248" />
  </svg>
);

export const AngularGlyph = () => (
  <svg viewBox="0 0 40 40" width="56%" height="56%">
    <path d="M20 3 L36 9 L33.5 30 L20 38 L6.5 30 L4 9 Z" fill="#DD0031" />
    <path
      d="M20 9 L28 28 H24.5 L23 24 H17 L15.5 28 H12 Z M20 15 L18 20 H22 Z"
      fill="#fff"
    />
  </svg>
);

/* Generic wordmark-style badge: a filled rounded chip with a short
   label. Used for every icon below so new skills can be added in
   one line without drawing a new shape each time. */
export const TextGlyph = ({ label, bg, color = "#fff", fontSize = 11 }) => (
  <svg viewBox="0 0 40 40" width="80%" height="80%">
    <rect x="1" y="1" width="38" height="38" rx="10" fill={bg} />
    <text
      x="20"
      y="25"
      textAnchor="middle"
      fontSize={fontSize}
      fontWeight="800"
      fontFamily="'Segoe UI', Arial, sans-serif"
      fill={color}
    >
      {label}
    </text>
  </svg>
);

export const ExpressGlyph = () => (
  <TextGlyph label="{ }" bg="#1a1a1a" fontSize={13} />
);
export const HtmlGlyph = () => (
  <TextGlyph label="HTML" bg="#E34F26" fontSize={9} />
);
export const CssGlyph = () => (
  <TextGlyph label="CSS" bg="#1572B6" fontSize={10} />
);
export const JavaScriptGlyph = () => (
  <TextGlyph label="JS" bg="#F7DF1E" color="#222" fontSize={13} />
);
export const TypeScriptGlyph = () => (
  <TextGlyph label="TS" bg="#3178C6" fontSize={13} />
);
export const BootstrapGlyph = () => (
  <TextGlyph label="B" bg="#7952B3" fontSize={16} />
);
export const GitGlyph = () => (
  <TextGlyph label="Git" bg="#F05032" fontSize={11} />
);
export const AwsGlyph = () => (
  <TextGlyph label="AWS" bg="#232F3E" color="#FF9900" fontSize={9} />
);
export const PythonGlyph = () => (
  <TextGlyph label="Py" bg="#306998" color="#FFD43B" fontSize={12} />
);
export const DjangoGlyph = () => (
  <TextGlyph label="Dj" bg="#092E20" color="#44B78B" fontSize={13} />
);
export const AgenticAiGlyph = () => (
  <TextGlyph label="AI" bg="#7C3AED" fontSize={13} />
);

/* Convenience map so callers can build a badge list by name,
   e.g. buildEvenBadges(["react","node","git","aws"]). */
export const GLYPHS = {
  react: { glyph: <ReactGlyph />, label: "React" },
  node: { glyph: <NodeGlyph />, label: "Node.js" },
  mongo: { glyph: <MongoGlyph />, label: "MongoDB" },
  express: { glyph: <ExpressGlyph />, label: "Express", tone: "dark" },
  angular: { glyph: <AngularGlyph />, label: "Angular" },
  html: { glyph: <HtmlGlyph />, label: "HTML5" },
  css: { glyph: <CssGlyph />, label: "CSS3" },
  javascript: { glyph: <JavaScriptGlyph />, label: "JavaScript" },
  typescript: { glyph: <TypeScriptGlyph />, label: "TypeScript" },
  bootstrap: { glyph: <BootstrapGlyph />, label: "Bootstrap" },
  git: { glyph: <GitGlyph />, label: "Git" },
  aws: { glyph: <AwsGlyph />, label: "AWS" },
  python: { glyph: <PythonGlyph />, label: "Python" },
  django: { glyph: <DjangoGlyph />, label: "Django" },
  agenticai: { glyph: <AgenticAiGlyph />, label: "Agentic AI" },
};

/** Build a badge array from glyph keys, spacing every icon evenly
 *  around the circle automatically (starting at the top). */
export const buildEvenBadges = (keys, startAngle = -90) =>
  keys.map((key, i) => ({
    id: key,
    angle: startAngle + i * (360 / keys.length),
    ...GLYPHS[key],
  }));

/** Default set: MERN/MEAN core + the requested language/tooling icons. */
export const DEFAULT_ORBIT_BADGES = buildEvenBadges([
  "react",
  "html",
  "css",
  "javascript",
  "typescript",
  "node",
  "bootstrap",
  "git",
  "mongo",
  "aws",
  "express",
  "python",
  "angular",
  "django",
  "agenticai",
]);

/* ---------------- animation ---------------- */

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;
const spinReverse = keyframes`from { transform: rotate(360deg); } to { transform: rotate(0deg); }`;

/* Independent CSS `rotate` property (not `transform`) so it never
   fights with a badge's own hover `scale`. */
const orbitSpin = keyframes`from { rotate: 0deg; } to { rotate: 360deg; }`;
const orbitCounterSpin = keyframes`from { rotate: 0deg; } to { rotate: -360deg; }`;

/* ---------------- styled parts ---------------- */

const Stage = styled.div`
  position: relative;
  width: ${({ $size }) => $size};
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover .to-glow-ring,
  &:hover .to-orbit-ring,
  &:hover .to-orbit-layer,
  &:hover .to-badge {
    animation-play-state: paused;
  }

  @media (max-width: 640px) {
    width: ${({ $mobileSize }) => $mobileSize};
  }
`;

const GlowRing = styled.div`
  position: absolute;
  inset: -6%;
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
  background: conic-gradient(
    from 0deg,
    ${({ theme }) => `${theme.primary}00`},
    ${({ theme }) => `${theme.primary}80`},
    ${({ theme }) => `${theme.primary}00`} 40%
  );
  filter: blur(14px);
  animation: ${spin} ${({ $ringSpeed }) => $ringSpeed}s linear infinite;
`;

const OrbitRing = styled.div`
  position: absolute;
  inset: -14%;
  border-radius: 50%;
  border: 1.5px dashed ${({ theme }) => `${theme.text_secondary}45`};
  z-index: 0;
  pointer-events: none;
  animation: ${spinReverse} ${({ $dashSpeed }) => $dashSpeed}s linear infinite;

  @media (max-width: 640px) {
    inset: -10%;
  }
`;

const OrbitLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  transform-origin: 50% 50%;
  animation: ${orbitSpin} ${({ $speed }) => $speed}s linear infinite;
`;

const Badge = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  margin: -24px 0 0 -24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: ${({ theme }) => `${theme.card || theme.bg}f0`};
  border: 1px solid ${({ theme }) => `${theme.text_secondary}30`};
  box-shadow: 0 10px 26px ${({ theme }) => `${theme.black || "#000"}33`};
  color: ${({ theme, $tone }) =>
    $tone === "dark" ? theme.text_primary : "inherit"};
  pointer-events: auto;
  transform-origin: 50% 50%;
  animation: ${orbitCounterSpin} ${({ $speed }) => $speed}s linear infinite;
  transition:
    scale 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    scale: 1.22;
    box-shadow: 0 14px 32px ${({ theme }) => `${theme.primary}55`};
    z-index: 5;
  }

  @media (max-width: 640px) {
    width: 34px;
    height: 34px;
    margin: -17px 0 0 -17px;
    border-radius: 10px;
  }
`;

const angleToPosition = (angle, radiusPct) => {
  const rad = (angle * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
};

/* ---------------- component ---------------- */

const TechOrbit = ({
  badges = DEFAULT_ORBIT_BADGES,
  children,
  size = "min(380px, 78vw)",
  mobileSize = "min(280px, 74vw)",
  radius = 54,
  orbitSpeed = 9,
  ringSpeed = 3.2,
  dashSpeed = 6,
  className,
}) => (
  <Stage $size={size} $mobileSize={mobileSize} className={className}>
    <GlowRing className="to-glow-ring" $ringSpeed={ringSpeed} />
    <OrbitRing className="to-orbit-ring" $dashSpeed={dashSpeed} />

    {children}

    <OrbitLayer className="to-orbit-layer" $speed={orbitSpeed}>
      {badges.map((badge, i) => (
        <Badge
          key={badge.id}
          className="to-badge"
          $tone={badge.tone}
          $speed={orbitSpeed}
          style={angleToPosition(badge.angle, radius)}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease: "easeOut" }}
          title={badge.label}
          aria-label={badge.label}
        >
          {badge.glyph}
        </Badge>
      ))}
    </OrbitLayer>
  </Stage>
);

export default TechOrbit;
