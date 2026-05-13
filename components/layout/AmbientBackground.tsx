"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-[-18%] h-[70vh] w-[120vw] -translate-x-1/2 bg-[linear-gradient(115deg,transparent_8%,rgba(41,151,255,0.075)_32%,rgba(102,199,255,0.035)_52%,transparent_76%)] blur-3xl"
        animate={{
          x: ["-7%", "6%", "-3%"],
          y: ["0%", "7%", "2%"],
          opacity: [0.32, 0.58, 0.4],
          rotate: [-7, 4, -3]
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-24%] right-[-18%] h-[62vh] w-[88vw] bg-[linear-gradient(135deg,transparent_12%,rgba(41,151,255,0.06)_42%,rgba(175,82,222,0.025)_64%,transparent_82%)] blur-3xl"
        animate={{
          x: ["3%", "-6%", "4%"],
          y: ["5%", "-4%", "2%"],
          opacity: [0.18, 0.42, 0.24],
          rotate: [8, -5, 3]
        }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(41,151,255,0.028),transparent_28%,rgba(41,151,255,0.018)_58%,transparent)]"
        animate={{ opacity: [0.25, 0.5, 0.32] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-[-20%] top-[18%] h-[42vh] bg-[linear-gradient(90deg,transparent,rgba(102,199,255,0.055),rgba(41,151,255,0.038),transparent)] blur-3xl"
        animate={{
          x: ["-12%", "9%", "-5%"],
          y: ["0%", "18%", "4%"],
          opacity: [0.2, 0.46, 0.28],
          skewX: [-8, 10, -4]
        }}
        transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </div>
  );
}
