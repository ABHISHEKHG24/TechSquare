"use client";

import React, { useRef, useState } from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import {
  Code2,
  Workflow,
  Film,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { motion } from "motion/react";

interface ServiceItem {
  id: string;
  practiceNumber: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentGradient: string;
  spotlightColor: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-software-development",
    practiceNumber: "01",
    title: "Web & Software Development",
    subtitle: "Enterprise Platforms & Bespoke Systems",
    description:
      "We design and engineer bespoke software applications, high-performance web platforms, and customer portals built for conversion, speed, and long-term scalability.",
    tag: "Enterprise Architecture",
    deliverables: [
      "Custom Enterprise Web Applications",
      "High-Conversion Client & Partner Portals",
      "Scalable Cloud & Systems Architecture",
      "Seamless API & Third-Party Integrations",
    ],
    icon: Code2,
    accentGradient: "from-blue-600 via-indigo-600 to-sky-400",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
    badgeColor: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
    borderColor: "hover:border-blue-500/50",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    id: "ai-automation",
    practiceNumber: "02",
    title: "AI Automation",
    subtitle: "Autonomous Workflows & Process Optimization",
    description:
      "We eliminate operational bottlenecks by designing intelligent automation pipelines that seamlessly connect your data, CRM, communication channels, and internal business logic.",
    tag: "Autonomous Systems",
    deliverables: [
      "Autonomous Multi-Step Workflows",
      "Intelligent Data & Document Extraction",
      "CRM, ERP & Internal Systems Integration",
      "Autonomous Task Execution & Alerting",
    ],
    icon: Workflow,
    accentGradient: "from-violet-600 via-purple-600 to-fuchsia-400",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
    badgeColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
    borderColor: "hover:border-purple-500/50",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  {
    id: "photo-video-editing",
    practiceNumber: "03",
    title: "Photo & Video Editing",
    subtitle: "Commercial Post-Production & Visual Storytelling",
    description:
      "Studio-grade visual media production that captures attention and elevates brand authority. We turn raw visual assets into cinematic commercial films, brand reels, and high-impact marketing collateral.",
    tag: "Cinematic Post-Production",
    deliverables: [
      "Commercial Brand & Promotional Films",
      "High-Retention Social & Digital Video",
      "Motion Graphics & Dynamic Storyboarding",
      "Precision Color Grading & Audio Mastering",
    ],
    icon: Film,
    accentGradient: "from-amber-600 via-orange-600 to-rose-400",
    spotlightColor: "rgba(249, 115, 22, 0.15)",
    badgeColor: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
    borderColor: "hover:border-amber-500/50",
    glowColor: "rgba(249, 115, 22, 0.3)",
  },
  {
    id: "ai-ads-creation",
    practiceNumber: "04",
    title: "AI Ads Creation",
    subtitle: "Data-Driven Generative Creative Campaigns",
    description:
      "High-converting generative advertising assets optimized for paid media channels. We combine creative direction with generative technology to produce hundreds of audience-targeted promotional variations rapidly.",
    tag: "Performance Media",
    deliverables: [
      "High-ROAS Paid Social Ad Creatives",
      "Multi-Variant Campaign Creatives",
      "Audience-Segmented Visual Assets",
      "Rapid Creative Testing & Deployment",
    ],
    icon: Megaphone,
    accentGradient: "from-emerald-600 via-teal-600 to-cyan-400",
    spotlightColor: "rgba(16, 185, 129, 0.15)",
    badgeColor: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
    borderColor: "hover:border-emerald-500/50",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
];

// 3D Interactive Card with cursor tracking tilt, dynamic spotlight & layer depth
const Interactive3DServiceCard = ({ service }: { service: ServiceItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Smooth tilt angle calculation (-7 to +7 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const Icon = service.icon;

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative flex flex-col justify-between h-full overflow-hidden rounded-3xl p-8 lg:p-10",
          "border border-slate-200/80 dark:border-white/10",
          "bg-white/80 dark:bg-zinc-900/75 backdrop-blur-xl",
          "shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer",
          service.borderColor
        )}
      >
        {/* Dynamic 3D Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${service.spotlightColor}, transparent 55%)`,
          }}
        />

        {/* Ambient Top Glow */}
        <div
          className={cn(
            "pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl opacity-20 transition-opacity duration-500",
            isHovered && "opacity-40",
            "bg-gradient-to-br",
            service.accentGradient
          )}
        />

        {/* 3D Depth Content Layer */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10">
          {/* Header Row: Icon & Tag */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div
              style={{ transform: "translateZ(40px)" }}
              className={cn(
                "flex items-center justify-center w-14 h-14 rounded-2xl border shadow-sm transition-transform duration-300",
                service.badgeColor,
                isHovered && "scale-110 shadow-md"
              )}
            >
              <Icon className="w-7 h-7" />
            </div>

            <div style={{ transform: "translateZ(25px)" }} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Practice
              </span>
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800 rounded-full px-2.5 py-0.5">
                {service.practiceNumber}
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div style={{ transform: "translateZ(35px)" }} className="mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-zinc-500">
              {service.tag}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              {service.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400 mt-1">
              {service.subtitle}
            </p>
          </div>

          {/* Description */}
          <p
            style={{ transform: "translateZ(20px)" }}
            className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-300 font-normal mb-6"
          >
            {service.description}
          </p>

          {/* Key Deliverables */}
          <div
            style={{ transform: "translateZ(25px)" }}
            className="space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-white/10"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Key Deliverables
            </p>
            <ul className="space-y-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 transition-transform duration-200 hover:translate-x-1"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="relative z-10 flex w-full flex-col pt-16 md:pt-20 pb-20 md:pb-28"
    >
      <div id="services" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="services"
          title="Services"
          desc="Four specialized digital practices engineered to accelerate software development, automate workflows, and deploy high-converting AI media."
          className="static mb-10 md:mb-14"
        />

        {/* 4 Interactive 3D Service Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pointer-events-auto">
          {SERVICES.map((service) => (
            <Interactive3DServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
