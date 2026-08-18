"use client";

import { useEffect, useRef } from "react";

const photos = [
  { src: "/care/care-01.png", alt: "A family visiting a patient in the hospital" },
  { src: "/care/care-02.png", alt: "A child in cancer treatment smiling from a hospital bed" },
  { src: "/care/care-03.png", alt: "A researcher looking through a microscope" },
  { src: "/care/care-04.png", alt: "A doctor reviewing care with a patient" },
  { src: "/care/care-05.png", alt: "A clinician reviewing a mammogram" },
  { src: "/care/care-06.png", alt: "A doctor sitting with a patient, holding her hand" },
  { src: "/care/care-07.png", alt: "A nurse holding a patient's hand during treatment" },
];

const LOOP_MS = 80000;

export function CareCarousel() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const measure = () => {
      const items = track.querySelectorAll<HTMLElement>(".care-frame");
      if (items.length < photos.length + 1) return;
      loopRef.current = items[photos.length].offsetLeft - items[0].offsetLeft;
    };

    measure();
    const images = track.querySelectorAll("img");
    images.forEach((image) => image.addEventListener("load", measure));
    const observer = new ResizeObserver(measure);
    observer.observe(track);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = performance.now();
    let raf = 0;

    const wrap = () => {
      const loop = loopRef.current;
      if (loop <= 0) return;
      if (root.scrollLeft >= loop) root.scrollLeft -= loop;
      if (root.scrollLeft < 0) root.scrollLeft += loop;
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!reduce.matches && loopRef.current > 0) {
        root.scrollLeft += (loopRef.current / LOOP_MS) * dt;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      images.forEach((image) => image.removeEventListener("load", measure));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="care-wrap">
      <section
        className="care-carousel"
        aria-label="People in cancer care"
        ref={rootRef}
      >
        <div className="care-track" ref={trackRef}>
          {[...photos, ...photos].map((photo, index) => (
            <figure className="care-frame" key={`${photo.src}-${index}`}>
              <img
                src={photo.src}
                alt={index < photos.length ? photo.alt : ""}
                draggable={false}
              />
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
