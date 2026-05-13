"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.35 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const updatePointerMode = () => setEnabled(finePointer.matches);

    updatePointerMode();
    finePointer.addEventListener("change", updatePointerMode);

    return () => finePointer.removeEventListener("change", updatePointerMode);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };

    const leave = () => setVisible(false);

    const over = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      setActive(Boolean(target?.closest("a, button, input, textarea, [data-cursor='interactive']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80]"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{
            width: active ? 60 : 40,
            height: active ? 60 : 40,
            borderColor: active ? "rgba(255,255,255,0.62)" : "rgba(41,151,255,0.48)",
            opacity: visible ? 0.62 : 0
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[81]"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2997ff]"
          animate={{ width: active ? 10 : 8, height: active ? 10 : 8, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.16 }}
        />
      </motion.div>
    </>
  );
}
