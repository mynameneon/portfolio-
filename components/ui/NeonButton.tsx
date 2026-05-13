"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function NeonButton({
  children,
  href,
  variant = "primary",
  type = "button",
  disabled = false,
  className,
  onClick
}: NeonButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    setRipples((items) => [...items, ripple]);
    window.setTimeout(() => {
      setRipples((items) => items.filter((item) => item.id !== ripple.id));
    }, 620);
  };

  const classes = clsx(
    "relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full border px-5 text-sm font-semibold outline-none",
    variant === "primary"
      ? "border-transparent bg-white text-black shadow-[0_16px_44px_rgba(255,255,255,0.12)]"
      : "border-line bg-white/[0.055] text-text-primary shadow-[0_18px_46px_rgba(0,0,0,0.26)] backdrop-blur-xl",
    disabled && "pointer-events-none opacity-60",
    className
  );

  const content = (
    <>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute h-8 w-8 rounded-full bg-[#2997ff]/35"
          style={{ left: ripple.x - 16, top: ripple.y - 16 }}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 9, opacity: 0 }}
          transition={{ duration: 0.62, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onPointerDown={addRipple}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        data-cursor="interactive"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={addRipple}
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      data-cursor="interactive"
    >
      {content}
    </motion.button>
  );
}
