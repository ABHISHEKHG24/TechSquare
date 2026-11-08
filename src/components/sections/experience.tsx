"use client";

import React, { useRef, useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  portfolioUrl: string;
}

const DUMMY_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Full-Stack Developer",
    avatar: "/assets/me.jpg",
    bio: "Specializes in scalable Next.js applications, cloud architecture, and high-performance full-stack web platforms.",
    portfolioUrl: "https://github.com",
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "AI Systems Engineer",
    avatar: "/assets/backgrounds/codingducks.jpg",
    bio: "Architects autonomous business workflows, custom LLM integrations, and intelligent data automation pipelines.",
    portfolioUrl: "https://github.com",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Creative Director",
    avatar: "/assets/backgrounds/portfolio.jpg",
    bio: "Designs modern responsive web experiences, bespoke design systems, and conversion-focused UI/UX interfaces.",
    portfolioUrl: "https://github.com",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Motion & Media Producer",
    avatar: "/assets/backgrounds/kanbi.jpg",
    bio: "Produces high-converting digital media assets, product animation reels, and commercial motion campaigns.",
    portfolioUrl: "https://github.com",
  },
];

const CARD_TRANSFORMS = [
  "rotateY(0deg) translateZ(var(--card-z, 340px))",
  "rotateY(90deg) translateZ(var(--card-z, 340px))",
  "rotateY(180deg) translateZ(var(--card-z, 340px))",
  "rotateY(270deg) translateZ(var(--card-z, 340px))",
];

const ExperienceSection = () => {
  const [rotation, setRotation] = useState({ y: 0, x: -4 });

  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const prevMouseXRef = useRef(0);
  const prevMouseYRef = useRef(0);
  const mouseVelocityXRef = useRef(0);
  const mouseVelocityYRef = useRef(0);
  const hoverSteerVelocityRef = useRef(0);
  const targetRotationRef = useRef({ y: 0, x: -4 });
  const currentRotationRef = useRef({ y: 0, x: -4 });
  const hasDraggedRef = useRef(false);

  // Animation Loop: increased rotation speed + mouse drag momentum + responsive hover steer
  useEffect(() => {
    let animId: number;

    const tick = () => {
      animId = requestAnimationFrame(tick);

      if (!isDraggingRef.current) {
        if (isHoveringRef.current) {
          // Dynamic steering while hovering over stage
          targetRotationRef.current.y += hoverSteerVelocityRef.current;
        } else {
          // Increased idle auto-rotation speed (0.36 deg/frame for lively, smooth rotation)
          targetRotationRef.current.y += 0.36;
        }

        // Apply and decay fling inertia
        mouseVelocityXRef.current *= 0.92;
        mouseVelocityYRef.current *= 0.92;
        targetRotationRef.current.y += mouseVelocityXRef.current;
        targetRotationRef.current.x += mouseVelocityYRef.current;

        // Clamp vertical tilt
        targetRotationRef.current.x = Math.max(-12, Math.min(8, targetRotationRef.current.x));
      }

      // Damped interpolation to target
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.12;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.12;

      setRotation({
        y: currentRotationRef.current.y,
        x: currentRotationRef.current.x,
      });
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Window-level mouse listeners for continuous drag control
  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseXRef.current;
      const deltaY = e.clientY - prevMouseYRef.current;

      if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
        hasDraggedRef.current = true;
      }

      const velY = deltaX * 0.55;
      const velX = -deltaY * 0.22;

      mouseVelocityXRef.current = velY;
      mouseVelocityYRef.current = velX;

      targetRotationRef.current.y += velY;
      targetRotationRef.current.x += velX;

      prevMouseXRef.current = e.clientX;
      prevMouseYRef.current = e.clientY;
    };

    const onWindowMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };
  }, []);

  // Hover steering with mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    // Follow cursor vertically with 3D tilt
    targetRotationRef.current.x = -4 + normalizedY * -10;

    // Increased hover steering speed
    hoverSteerVelocityRef.current = normalizedX * 1.1;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    prevMouseXRef.current = e.clientX;
    prevMouseYRef.current = e.clientY;
    mouseVelocityXRef.current = 0;
    mouseVelocityYRef.current = 0;
  };

  // Touch drag support for mobile / touch devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    prevMouseXRef.current = touch.clientX;
    prevMouseYRef.current = touch.clientY;
    mouseVelocityXRef.current = 0;
    mouseVelocityYRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - prevMouseXRef.current;
    const deltaY = touch.clientY - prevMouseYRef.current;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasDraggedRef.current = true;
    }

    const velY = deltaX * 0.6;
    const velX = -deltaY * 0.22;

    mouseVelocityXRef.current = velY;
    mouseVelocityYRef.current = velX;

    targetRotationRef.current.y += velY;
    targetRotationRef.current.x += velX;

    prevMouseXRef.current = touch.clientX;
    prevMouseYRef.current = touch.clientY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const rotateToMember = (index: number) => {
    const currentNorm = ((Math.round(-currentRotationRef.current.y / 90) % 4) + 4) % 4;
    let stepDiff = (index - currentNorm) % 4;
    if (stepDiff > 2) stepDiff -= 4;
    if (stepDiff < -2) stepDiff += 4;
    targetRotationRef.current.y = Math.round(currentRotationRef.current.y / 90) * 90 - stepDiff * 90;
    mouseVelocityXRef.current = 0;
    mouseVelocityYRef.current = 0;
    hoverSteerVelocityRef.current = 0;
  };

  // Active front card index
  const normalizedIndex =
    ((Math.round(-rotation.y / 90) % 4) + 4) % 4;

  return (
    <section
      id="team"
      className="relative w-full flex flex-col items-center pt-20 select-none overflow-x-clip pointer-events-auto"
      style={{
        paddingBottom: "40px",
        marginBottom: "20px",
        pointerEvents: "auto",
      }}
    >
      <div id="experience" className="sr-only" />

      {/* Header Container */}
      <div className="w-full max-w-5xl px-4 sm:px-6 flex flex-col items-center text-center mb-10 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 backdrop-blur-md mb-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Dedicated Specialist Team
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
          Meet the Team
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-xl">
          Move your mouse over the showcase or click and drag to rotate through each specialist in 3D.
        </p>
      </div>

      {/* 3D Perspective Stage — Wider horizontal layout with compact height */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          hoverSteerVelocityRef.current = 0;
        }}
        style={{
          perspective: "1200px",
          touchAction: "pan-y",
          height: "400px",
          pointerEvents: "auto",
        }}
        className={cn(
          "relative w-full max-w-6xl mx-auto flex items-center justify-center",
          "cursor-grab active:cursor-grabbing pointer-events-auto",
          "[--card-z:280px] sm:[--card-z:320px] md:[--card-z:350px]"
        )}
      >
        {/* Rotating 3D Diamond Core — Wide horizontal card frame */}
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            width: "min(92vw, 540px)",
            height: "260px",
            pointerEvents: "auto",
          }}
          className="relative pointer-events-auto"
        >
          {DUMMY_MEMBERS.map((member, i) => {
            const isActive = normalizedIndex === i;

            return (
              <div
                key={member.id}
                onClick={() => {
                  if (!hasDraggedRef.current && !isActive) {
                    rotateToMember(i);
                  }
                }}
                className={cn(
                  "absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-7 flex flex-row items-center gap-5 sm:gap-6 pointer-events-auto",
                  "section-theme-card border-2 transition-all duration-300",
                  isActive
                    ? "shadow-2xl z-20 opacity-100 ring-2 ring-blue-500/50 dark:ring-blue-400/40"
                    : "shadow-xl z-10 opacity-80 hover:opacity-100 cursor-pointer"
                )}
                style={{
                  transform: CARD_TRANSFORMS[i],
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  pointerEvents: "auto",
                  backgroundColor: "var(--section-card-bg)",
                  borderColor: isActive ? "#3b82f6" : "var(--section-card-border)",
                }}
              >
                {/* Left Column: Photo (Correct Size, Clean Border) */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.avatar}
                    alt={member.name}
                    loading="eager"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/me.jpg";
                    }}
                    className="w-full h-full object-cover object-center block"
                  />
                </div>

                {/* Right Column: Name, Role, Paragraph Bio, Button */}
                <div className="flex flex-col items-start justify-center text-left flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold font-display section-theme-title tracking-tight leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm section-theme-desc leading-relaxed mt-1.5 line-clamp-2">
                    {member.bio}
                  </p>
                  <div className="mt-3.5 flex items-center">
                    <Link
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer theme-btn-primary hover:opacity-95"
                    >
                      <span className="font-bold text-xs tracking-wider inline-block">
                        View Profile
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;