"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { ProjectPreviewVariant } from "@/lib/projectShowcase";

interface ProjectPreviewProps {
  variant: ProjectPreviewVariant;
  accent: string;
}

function WindowFrame({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-[24px] border border-white/10 bg-black/55 p-4 shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-2.5 w-2.5 rounded-full bg-white/18" />
          ))}
        </div>
        <span className="h-2 w-20 rounded-full" style={{ background: `${accent}66` }} />
      </div>
      {children}
    </div>
  );
}

function BoardPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid h-[150px] grid-cols-6 gap-1.5">
        {Array.from({ length: 36 }).map((_, index) => (
          <span
            key={index}
            className="rounded-md border border-white/8 bg-white/[0.045]"
            style={{ background: index % 7 === 0 ? `${accent}24` : undefined }}
          />
        ))}
      </div>
      <motion.span
        className="absolute h-5 w-5 rounded-full border-2 border-black"
        style={{ background: accent }}
        animate={{ x: [28, 114, 202, 202, 114, 28], y: [78, 78, 78, 154, 154, 154] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </WindowFrame>
  );
}

function AudioPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid gap-3">
        {[0, 1, 2, 3].map((track) => (
          <div key={track} className="grid grid-cols-[56px_1fr] items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[10px] text-[var(--text-soft)]">TR {track + 1}</span>
            <div className="flex h-8 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.035] px-2">
              {Array.from({ length: 20 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="w-1 rounded-full"
                  style={{ background: index % 5 === 0 ? accent : "rgba(255,255,255,0.26)" }}
                  animate={{ height: [6, 22 - ((index + track) % 9), 8 + ((index + track) % 12)] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.03, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <motion.span className="absolute bottom-5 top-14 w-px" style={{ background: accent }} animate={{ x: [86, 255, 86] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
    </WindowFrame>
  );
}

function ChatPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid grid-cols-[64px_1fr] gap-3">
        <div className="grid content-start gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.span
              key={index}
              className="h-8 rounded-xl border border-white/10 bg-white/[0.05]"
              animate={{ opacity: [0.45, index === 2 ? 1 : 0.65, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.18 }}
            />
          ))}
        </div>
        <div className="grid gap-2">
          {[0, 1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.045] p-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: [0.5, 1, 0.5], x: 0 }}
              transition={{ duration: 2.8, repeat: Infinity, delay: item * 0.22 }}
            >
              <span className="block h-2 w-20 rounded-full" style={{ background: `${accent}77` }} />
              <span className="mt-2 block h-2 w-full rounded-full bg-white/16" />
              <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

function DashboardPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid h-[150px] grid-cols-4 grid-rows-3 gap-2">
        <motion.div className="col-span-2 row-span-2 rounded-2xl border border-white/10 bg-white/[0.055] p-3" animate={{ y: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity }}>
          <span className="block h-3 w-20 rounded-full" style={{ background: accent }} />
          <span className="mt-8 block h-12 rounded-xl bg-white/10" />
        </motion.div>
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.span
            key={item}
            className="rounded-2xl border border-white/10 bg-white/[0.045]"
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: item * 0.2 }}
          />
        ))}
      </div>
    </WindowFrame>
  );
}

function MapPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="relative h-[150px] rounded-2xl border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:32px_32px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 150" aria-hidden="true">
          <motion.path
            d="M28 118 C70 28, 126 128, 170 64 S238 38, 256 102"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0.18, 1, 0.18] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        {[["16%", "73%"], ["45%", "39%"], ["72%", "33%"], ["90%", "66%"]].map(([left, top], index) => (
          <motion.span
            key={index}
            className="absolute h-4 w-4 rounded-full border-2 border-black"
            style={{ left, top, background: accent }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.22 }}
          />
        ))}
      </div>
    </WindowFrame>
  );
}

function FilesPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid grid-cols-[74px_1fr] gap-3">
        <div className="grid gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="h-7 rounded-lg border border-white/10 bg-white/[0.045]" />
          ))}
        </div>
        <div className="grid gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-[20px_1fr_42px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-2 py-2"
              animate={{ x: index === 2 ? [0, 8, 0] : 0, borderColor: index === 2 ? ["rgba(255,255,255,0.1)", `${accent}80`, "rgba(255,255,255,0.1)"] : undefined }}
              transition={{ duration: 2.6, repeat: Infinity }}
            >
              <span className="h-4 w-4 rounded-md" style={{ background: index % 3 === 0 ? accent : "rgba(255,255,255,0.2)" }} />
              <span className="h-2 rounded-full bg-white/16" />
              <span className="h-2 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

function StreamPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="relative h-[150px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
        <motion.div className="absolute left-4 top-5 flex gap-3" animate={{ x: [0, -130, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-28 w-20 rounded-2xl border border-white/10 bg-white/[0.07] p-2">
              <span className="block h-16 rounded-xl" style={{ background: index === 1 ? `${accent}66` : "rgba(255,255,255,0.11)" }} />
              <span className="mt-2 block h-2 rounded-full bg-white/16" />
              <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>
    </WindowFrame>
  );
}

function TerminalPreview({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid gap-2 font-mono text-[11px] text-[var(--text-soft)]">
        {["npm run build", "compile routes", "sync database", "deploy target", "status: ready"].map((line, index) => (
          <motion.span key={line} initial={{ opacity: 0, x: -6 }} animate={{ opacity: [0.35, 1, 0.35], x: 0 }} transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.24 }}>
            <span style={{ color: accent }}>$</span> {line}
          </motion.span>
        ))}
      </div>
      <motion.span className="mt-3 inline-block h-4 w-2" style={{ background: accent }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} />
    </WindowFrame>
  );
}

function PreviewPlaceholder({ accent }: { accent: string }) {
  return (
    <WindowFrame accent={accent}>
      <div className="grid h-[150px] grid-cols-5 gap-2">
        {Array.from({ length: 15 }).map((_, index) => (
          <span
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.045]"
            style={{ background: index === 7 ? `${accent}22` : undefined }}
          />
        ))}
      </div>
    </WindowFrame>
  );
}

function renderProjectPreview(variant: ProjectPreviewVariant, accent: string) {
  if (variant === "board") return <BoardPreview accent={accent} />;
  if (variant === "audio") return <AudioPreview accent={accent} />;
  if (variant === "chat") return <ChatPreview accent={accent} />;
  if (variant === "dashboard") return <DashboardPreview accent={accent} />;
  if (variant === "map") return <MapPreview accent={accent} />;
  if (variant === "files") return <FilesPreview accent={accent} />;
  if (variant === "stream") return <StreamPreview accent={accent} />;
  if (variant === "terminal" || variant === "key") return <TerminalPreview accent={accent} />;
  return <BoardPreview accent={accent} />;
}

export function ProjectPreview({ variant, accent }: ProjectPreviewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "240px 0px", once: false });

  return <div ref={ref}>{inView ? renderProjectPreview(variant, accent) : <PreviewPlaceholder accent={accent} />}</div>;
}
