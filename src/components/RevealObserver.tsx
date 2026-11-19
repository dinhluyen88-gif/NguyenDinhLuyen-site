"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Bật hiệu ứng hiện dần khi cuộn cho mọi phần tử có class `reveal`.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    const nodes = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
