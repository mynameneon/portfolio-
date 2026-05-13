"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: readonly string[], rootMargin = "-35% 0px -55% 0px") {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin,
        threshold: 0.12
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [rootMargin, sectionIds]);

  return activeSection;
}
