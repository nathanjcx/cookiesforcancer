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

const LOOP_MS = 42000;

export function CareCarousel() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const loopRef = useRef(0);
  const drag = useRef({
    active: false,
    startX: 0,
    startTime: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let anim: Animation | null = null;

    const start = () => {
      const items = track.querySelectorAll<HTMLElement>(".care-frame");
      if (items.length < photos.length + 1) return;
      const loop = items[photos.length].offsetLeft - items[0].offsetLeft;
      if (loop <= 0) return;
      if (loop === loopRef.current && anim) return;

      const paused = anim?.playState === "paused";
      const progress =
        anim && loopRef.current
          ? (Number(anim.currentTime ?? 0) % LOOP_MS)
          : 0;

      loopRef.current = loop;
      anim?.cancel();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        anim = null;
        animRef.current = null;
        track.style.transform = "translateX(0)";
        return;
      }

      anim = track.animate(
        [
          { transform: "translateX(0px)" },
          { transform: `translateX(${-loop}px)` },
        ],
        { duration: LOOP_MS, iterations: Infinity, easing: "linear" },
      );
      anim.currentTime = progress;
      if (paused) anim.pause();
      animRef.current = anim;
    };

    start();
    const images = track.querySelectorAll("img");
    images.forEach((image) => image.addEventListener("load", start));
    const observer = new ResizeObserver(start);
    observer.observe(track);

    return () => {
      images.forEach((image) => image.removeEventListener("load", start));
      observer.disconnect();
      anim?.cancel();
      animRef.current = null;
    };
  }, []);

  function pause() {
    animRef.current?.pause();
  }

  function play() {
    if (drag.current.active) return;
    animRef.current?.play();
  }

  function scrub(clientX: number) {
    const anim = animRef.current;
    const loop = loopRef.current;
    if (!anim || loop <= 0) return;
    const next =
      drag.current.startTime -
      ((clientX - drag.current.startX) * LOOP_MS) / loop;
    anim.currentTime = ((next % LOOP_MS) + LOOP_MS) % LOOP_MS;
  }

  return (
    <section
      className="care-carousel"
      aria-label="People in cancer care"
      ref={rootRef}
      onMouseEnter={pause}
      onMouseLeave={() => {
        drag.current.active = false;
        play();
      }}
      onPointerDown={(event) => {
        const anim = animRef.current;
        if (!anim) return;
        pause();
        drag.current = {
          active: true,
          startX: event.clientX,
          startTime: Number(anim.currentTime ?? 0) % LOOP_MS,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!drag.current.active) return;
        scrub(event.clientX);
      }}
      onPointerUp={(event) => {
        drag.current.active = false;
        const root = rootRef.current;
        if (!root || event.pointerType !== "mouse") {
          play();
          return;
        }
        const rect = root.getBoundingClientRect();
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        if (!inside) play();
      }}
      onPointerCancel={() => {
        drag.current.active = false;
        play();
      }}
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
  );
}
