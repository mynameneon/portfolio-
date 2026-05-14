"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ExperienceAnimationName } from "@/types";

interface ExperienceAnimationProps {
  name: ExperienceAnimationName;
  accentColor: string;
  large?: boolean;
}

export function ExperienceAnimation({ name, accentColor, large = false }: ExperienceAnimationProps) {
  const className = large ? "h-[240px] w-full" : "h-[176px] w-full";
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "240px 0px", once: false });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        renderExperienceAnimation(name, accentColor, large, "h-full w-full")
      ) : (
        <AnimationPlaceholder accentColor={accentColor} />
      )}
    </div>
  );
}

function renderExperienceAnimation(name: ExperienceAnimationName, accentColor: string, large: boolean, className: string) {
  switch (name) {
    case "cart":
      return <CartAnimation accentColor={accentColor} className={className} />;
    case "crane":
      return <CraneAnimation accentColor={accentColor} className={className} />;
    case "battery":
      return <BatteryAnimation accentColor={accentColor} className={className} />;
    case "conveyor":
      return <ConveyorAnimation accentColor={accentColor} className={className} />;
    case "supermarket":
      return <SupermarketAnimation accentColor={accentColor} className={className} />;
    case "drone":
      return <DroneAnimation accentColor={accentColor} className={className} />;
    case "terminal":
      return <TerminalAnimation accentColor={accentColor} large={large} />;
    case "wireframe":
      return <WireframeAnimation accentColor={accentColor} className={className} />;
    case "social":
      return <SocialAnimation accentColor={accentColor} className={className} />;
    case "hiring":
      return <HiringAnimation accentColor={accentColor} className={className} />;
    case "charts":
      return <ChartsAnimation accentColor={accentColor} className={className} />;
    case "browser":
      return <BrowserAnimation accentColor={accentColor} className={className} />;
    case "funnel":
      return <FunnelAnimation accentColor={accentColor} className={className} />;
    case "paint":
      return <PaintAnimation accentColor={accentColor} className={className} />;
    default:
      return null;
  }
}

function AnimationPlaceholder({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:36px_36px] opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-14 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/30" style={{ boxShadow: `0 22px 70px ${accentColor}22` }} />
    </div>
  );
}

function SvgFrame({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <svg viewBox="0 0 360 200" className={className} role="img" aria-hidden="true">
      <rect x="16" y="18" width="328" height="164" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
      {children}
    </svg>
  );
}

function CartAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <motion.g animate={{ x: [-54, 54, -54] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M100 118h92l16-54h-122" fill="none" stroke={accentColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M78 54h20l18 64" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="122" cy="142" r="10" fill={accentColor} />
        <circle cx="188" cy="142" r="10" fill={accentColor} />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "252px 76px" }}
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="232" y="54" width="42" height="32" rx="8" fill="rgba(255,255,255,0.06)" stroke={accentColor} />
        <text x="253" y="75" textAnchor="middle" fill={accentColor} fontSize="13" fontFamily="monospace">
          %
        </text>
      </motion.g>
    </SvgFrame>
  );
}

function CraneAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M94 154h96M120 154v-96M102 58h154" stroke="rgba(255,255,255,0.24)" strokeWidth="7" strokeLinecap="round" />
      <motion.g
        style={{ transformOrigin: "120px 58px" }}
        animate={{ rotate: [-4, 5, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M120 58h160l-36 24" stroke={accentColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
      <motion.g animate={{ y: [0, 34, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M246 80v48" stroke={accentColor} strokeWidth="3" />
        <rect x="226" y="128" width="40" height="28" rx="6" fill={accentColor} opacity="0.82" />
      </motion.g>
    </SvgFrame>
  );
}

function BatteryAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <rect x="112" y="48" width="120" height="106" rx="16" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="5" />
      <rect x="238" y="82" width="16" height="38" rx="5" fill="rgba(255,255,255,0.18)" />
      <motion.rect
        x="126"
        width="92"
        rx="7"
        fill={accentColor}
        animate={{ y: [132, 64, 132], height: [10, 78, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M178 64l-24 44h24l-12 34 40-54h-26z"
        fill={accentColor}
        animate={{ opacity: [0.32, 1, 0.32] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </SvgFrame>
  );
}

function ConveyorAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  const boxes = [86, 156, 226];

  return (
    <SvgFrame className={className}>
      <rect x="54" y="132" width="252" height="24" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.path
          key={item}
          d={`M${74 + item * 48} 144h30`}
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ x: [0, 24, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: item * 0.08 }}
        />
      ))}
      {boxes.map((x, index) => (
        <motion.rect
          key={x}
          x={x}
          y="78"
          width="42"
          height="42"
          rx="8"
          fill={accentColor}
          opacity="0.78"
          animate={{ y: [36, 92, 92] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.42 }}
        />
      ))}
    </SvgFrame>
  );
}

function SupermarketAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M72 76h190M72 112h190M72 148h190" stroke="rgba(255,255,255,0.14)" strokeWidth="6" strokeLinecap="round" />
      {[92, 128, 176, 218].map((x, index) => (
        <motion.rect
          key={x}
          x={x}
          y={index % 2 === 0 ? 54 : 90}
          width="24"
          height="18"
          rx="5"
          fill={accentColor}
          animate={{ opacity: [0.18, 0.9, 0.18] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.22 }}
        />
      ))}
      <motion.g animate={{ x: [-34, 44, -34] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M90 128h72l12-38h-96" fill="none" stroke={accentColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="106" cy="152" r="8" fill={accentColor} />
        <circle cx="160" cy="152" r="8" fill={accentColor} />
      </motion.g>
    </SvgFrame>
  );
}

function DroneAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  const props = [
    { cx: 118, cy: 68 },
    { cx: 242, cy: 68 },
    { cx: 118, cy: 132 },
    { cx: 242, cy: 132 }
  ];

  return (
    <SvgFrame className={className}>
      <motion.g animate={{ y: [-8, 8, -8] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M118 68l124 64M242 68l-124 64" stroke="rgba(255,255,255,0.16)" strokeWidth="5" strokeLinecap="round" />
        <rect x="154" y="78" width="52" height="44" rx="15" fill={accentColor} opacity="0.82" />
        {props.map((prop) => (
          <motion.g
            key={`${prop.cx}-${prop.cy}`}
            style={{ transformOrigin: `${prop.cx}px ${prop.cy}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          >
            <circle cx={prop.cx} cy={prop.cy} r="25" fill="none" stroke={accentColor} strokeWidth="4" opacity="0.85" />
            <path d={`M${prop.cx - 22} ${prop.cy}h44M${prop.cx} ${prop.cy - 22}v44`} stroke="rgba(255,255,255,0.26)" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        ))}
      </motion.g>
    </SvgFrame>
  );
}

function TerminalAnimation({ accentColor, large }: { accentColor: string; large: boolean }) {
  const lines = ["$ npm run build", "compiling portfolio routes", "api/contact.ts ready", "deploy target: netlify"];

  return (
    <div
      className={
        large
          ? "grid h-[240px] w-full place-items-center"
          : "grid h-[176px] w-full place-items-center"
      }
    >
      <div className="w-[min(86%,420px)] rounded-2xl border border-white/10 bg-black p-4 font-mono text-xs leading-7 text-[#30d158] shadow-[0_22px_70px_rgba(0,0,0,0.38)]">
        {lines.map((line, index) => (
          <motion.span
            key={line}
            className={index % 2 === 0 ? "block text-[var(--text-faint)]" : "block"}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.38, delay: index * 0.35, repeat: Infinity, repeatDelay: 4.2 }}
          >
            {line}
          </motion.span>
        ))}
        <motion.span
          className="inline-block h-4 w-2 align-middle"
          style={{ backgroundColor: accentColor }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

function WireframeAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <rect x="76" y="50" width="178" height="104" rx="12" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.12)" />
      {[0, 1, 2].map((item) => (
        <motion.rect
          key={item}
          x={96 + item * 42}
          y={78 + item * 14}
          width={item === 0 ? 90 : 72}
          height="18"
          rx="5"
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: item * 0.28, repeatDelay: 1.1 }}
        />
      ))}
      <motion.path
        d="M80 62 C150 80 132 132 222 136"
        fill="none"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle cx="278" cy="62" r="18" fill={accentColor} animate={{ scale: [0.9, 1.15, 0.9] }} transition={{ duration: 1.8, repeat: Infinity }} />
    </SvgFrame>
  );
}

function SocialAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <rect x="106" y="62" width="56" height="56" rx="16" fill="rgba(255,255,255,0.055)" stroke={accentColor} />
      <rect x="198" y="62" width="56" height="56" rx="16" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" />
      <motion.text x="134" y="97" textAnchor="middle" fill={accentColor} fontSize="22" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.2, repeat: Infinity }}>
        IG
      </motion.text>
      <motion.text x="226" y="97" textAnchor="middle" fill={accentColor} fontSize="22" animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
        TG
      </motion.text>
      {[126, 168, 214, 252].map((x, index) => (
        <motion.text
          key={x}
          x={x}
          y="150"
          textAnchor="middle"
          fill={accentColor}
          fontSize="24"
          animate={{ y: [150, 56], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
        >
          ♥
        </motion.text>
      ))}
    </SvgFrame>
  );
}

function HiringAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M220 70h58v88h-112V98h54z" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.14)" strokeWidth="3" strokeLinejoin="round" />
      {[0, 1, 2].map((item) => (
        <motion.g
          key={item}
          animate={{ x: [0, 86], rotate: [0, 7, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: item * 0.42 }}
        >
          <rect x="72" y={60 + item * 24} width="56" height="38" rx="7" fill="rgba(255,255,255,0.055)" stroke={accentColor} />
          <path d={`M84 ${74 + item * 24}h30M84 ${86 + item * 24}h20`} stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      ))}
      {[0, 1, 2].map((item) => (
        <motion.text
          key={item}
          x={198 + item * 24}
          y="150"
          fill={accentColor}
          fontSize="24"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 + item * 0.28, repeatDelay: 1.2 }}
        >
          ✓
        </motion.text>
      ))}
    </SvgFrame>
  );
}

function ChartsAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      {[0, 1, 2, 3].map((item) => {
        const height = 26 + item * 18;
        return (
          <motion.rect
            key={item}
            x={84 + item * 36}
            width="22"
            rx="6"
            fill={accentColor}
            animate={{ y: [148, 148 - height, 148 - height], height: [0, height, height] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: item * 0.16, repeatDelay: 1.1 }}
          />
        );
      })}
      <motion.path
        d="M78 126 C118 104 142 122 178 88 S244 86 282 54"
        fill="none"
        stroke={accentColor}
        strokeWidth="5"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.2 }}
      />
    </SvgFrame>
  );
}

function BrowserAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <rect x="74" y="54" width="212" height="112" rx="16" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.12)" />
      <path d="M74 82h212" stroke="rgba(255,255,255,0.12)" />
      <rect x="92" y="98" width="176" height="16" rx="8" fill="rgba(255,255,255,0.08)" />
      <motion.rect x="92" y="98" height="16" rx="8" fill={accentColor} animate={{ width: [0, 176, 176] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1 }} />
      <motion.g animate={{ opacity: [0, 1, 1] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.4 }}>
        <rect x="132" y="130" width="96" height="18" rx="9" fill="rgba(48,209,88,0.12)" stroke={accentColor} />
        <path d="M170 139h20M176 139v-7a7 7 0 0114 0v7" stroke={accentColor} strokeWidth="3" strokeLinecap="round" fill="none" />
      </motion.g>
    </SvgFrame>
  );
}

function FunnelAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <path d="M112 64h136l-48 58v34h-40v-34z" fill="rgba(255,255,255,0.055)" stroke={accentColor} strokeWidth="4" strokeLinejoin="round" />
      {[132, 168, 204].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy="44"
          r="10"
          fill={accentColor}
          animate={{ y: [0, 70], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.32 }}
        />
      ))}
      {[0, 1, 2].map((item) => (
        <motion.g
          key={item}
          animate={{ opacity: [0, 1, 1], y: [12, 0, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 1 + item * 0.28, repeatDelay: 1.1 }}
        >
          <circle cx={140 + item * 40} cy="160" r="10" fill="rgba(255,255,255,0.055)" stroke={accentColor} />
          <path d={`M${128 + item * 40} 176c7-10 17-10 24 0`} stroke={accentColor} strokeWidth="3" strokeLinecap="round" fill="none" />
        </motion.g>
      ))}
    </SvgFrame>
  );
}

function PaintAnimation({ accentColor, className }: { accentColor: string; className: string }) {
  return (
    <SvgFrame className={className}>
      <motion.path
        d="M80 112h190"
        stroke={accentColor}
        strokeWidth="22"
        strokeLinecap="round"
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.1 }}
      />
      <motion.g animate={{ x: [0, 190, 190] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.1 }}>
        <rect x="64" y="92" width="40" height="24" rx="7" fill="rgba(255,255,255,0.055)" stroke={accentColor} />
        <path d="M98 105l34-28" stroke={accentColor} strokeWidth="7" strokeLinecap="round" />
        <path d="M128 80l20-18" stroke="rgba(255,255,255,0.38)" strokeWidth="8" strokeLinecap="round" />
      </motion.g>
    </SvgFrame>
  );
}
