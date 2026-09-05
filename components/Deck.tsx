"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import graffitiLogo from "@/public/images/graffiti-logo.png";

// Full-viewport slide deck: scroll-snap sections, keyboard navigation,
// an animated pager, and a film-grain overlay.
// `innerLabel`, when given, replaces the site link in the header on every
// slide except the first and last (used by proposal decks to show the artist).
export default function Deck({
  children,
  innerLabel,
}: {
  children: React.ReactNode;
  innerLabel?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const [idx, setIdx] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [count, setCount] = useState(12);

  const nearestIndex = (el: HTMLDivElement) => {
    let best = Infinity;
    let nearest = 0;
    for (let i = 0; i < el.children.length; i++) {
      const d = Math.abs((el.children[i] as HTMLElement).offsetTop - el.scrollTop);
      if (d < best) {
        best = d;
        nearest = i;
      }
    }
    return nearest;
  };

  const goTo = useCallback((n: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const i = Math.max(0, Math.min(el.children.length - 1, n));
    targetRef.current = i;
    cancelAnimationFrame(rafRef.current);
    setSnapping(true);
    setIdx(i);
    const from = el.scrollTop;
    const to = Math.min(
      (el.children[i] as HTMLElement).offsetTop,
      el.scrollHeight - el.clientHeight
    );
    const dur = 450;
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      el.scrollTop = from + (to - from) * ease(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      targetRef.current = null;
      setSnapping(false);
      setIdx(nearestIndex(el));
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const go = useCallback(
    (d: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const base = targetRef.current != null ? targetRef.current : nearestIndex(el);
      goTo(base + d);
    },
    [goTo]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (el) setCount(el.children.length);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo((scrollRef.current?.children.length ?? 1) - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    const onScroll = () => {
      const c = scrollRef.current;
      if (!c || targetRef.current != null) return;
      setIdx(nearestIndex(c));
    };
    el?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKey);
      el?.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [go, goTo]);

  const pageLabel =
    String(idx + 1).padStart(2, "0") + " / " + String(count).padStart(2, "0");

  return (
    <div className="deck-root">
      <div
        id="deck-scroll"
        className="deck-scroll"
        ref={scrollRef}
        style={{ scrollSnapType: snapping ? "none" : "y proximity" }}
      >
        {children}
      </div>

      <header className="deck-header">
        <div className="brand">
          <Image src={graffitiLogo} alt="Eternal" style={{ width: 78, height: "auto" }} />
        </div>
        {innerLabel && idx > 0 && idx < count - 1 ? (
          <span className="site-link header-label">{innerLabel}</span>
        ) : (
          <a
            className="site-link"
            href="https://eternaltilidie.com"
            target="_blank"
            rel="noopener"
          >
            eternaltilidie.com
          </a>
        )}
      </header>

      <div className="deck-pager">
        <span className="page-label">{pageLabel}</span>
        <button
          aria-label="Previous page"
          style={{ opacity: idx === 0 ? 0.35 : 1 }}
          onClick={() => go(-1)}
        >
          ↑
        </button>
        <button
          aria-label="Next page"
          style={{ opacity: idx >= count - 1 ? 0.35 : 1 }}
          onClick={() => go(1)}
        >
          ↓
        </button>
      </div>

      <div className="grain" />
    </div>
  );
}
