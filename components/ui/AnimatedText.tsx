"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  texts: readonly string[];
  className?: string;
}

export function AnimatedText({ texts, className }: AnimatedTextProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) {
      return undefined;
    }

    const current = texts[index] ?? "";
    const doneTyping = !deleting && display === current;
    const doneDeleting = deleting && display.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (doneTyping) {
          setDeleting(true);
          return;
        }

        if (doneDeleting) {
          setDeleting(false);
          setIndex((value) => (value + 1) % texts.length);
          return;
        }

        setDisplay((value) => {
          if (deleting) {
            return value.slice(0, -1);
          }

          return current.slice(0, value.length + 1);
        });
      },
      doneTyping ? 1800 : deleting ? 34 : 58
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, display, index, texts]);

  return (
    <span className={className} aria-live="polite">
      {display}
      <motion.span
        aria-hidden="true"
        className="ml-1 inline-block text-[#2997ff]"
        animate={{ opacity: [0.18, 1, 0.18] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      >
        |
      </motion.span>
    </span>
  );
}
