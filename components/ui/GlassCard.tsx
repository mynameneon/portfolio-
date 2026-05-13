"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"article"> {
  hoverGlow?: string;
}

export function GlassCard({ className, hoverGlow = "0 34px 110px rgba(0,0,0,0.52)", children, ...props }: GlassCardProps) {
  return (
    <motion.article
      className={clsx("glass min-w-0", className)}
      whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.18)", boxShadow: hoverGlow }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      {...props}
    >
      {children}
    </motion.article>
  );
}
