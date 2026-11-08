"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import SectionWrapper from "../ui/section-wrapper";
import TechSquare3D from "../techsquare-3d/techsquare-3d";

const HeroSection = () => {
  return (
    <SectionWrapper
      id="hero"
      className="relative w-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-20"
      style={{ paddingTop: "140px" }}
    >
      {/* 2-Column Grid: Text on Left (50%), 3D Model on Right (50%) */}
      <div
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        style={{ marginTop: "16px" }}
      >
        {/* Left Column: All text, headings, and CTA buttons */}
        <div className="flex flex-col items-start text-left w-full pr-0 md:pr-4 lg:pr-8 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 backdrop-blur-md mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Agile Tech & Creative Studio
          </div>

          {/* Heading */}
          <h1
            className={cn(
              "-ml-[2px] leading-[1.1] text-slate-900 dark:text-white text-left",
              "font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl",
              "cursor-default tracking-tight font-display"
            )}
          >
            Welcome to{" "}
            <span className="inline-block drop-shadow-lg">
              <span
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block align-baseline"
                style={{
                  backgroundImage: "linear-gradient(to right, #22d3ee, #3b82f6, #9333ea)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TechSquare
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={cn(
              "mt-5 text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-300 text-left",
              "cursor-default leading-relaxed font-normal max-w-xl"
            )}
          >
            We build modern software, automate your workflows, and create high-converting digital media.
          </p>

          {/* Action Buttons & Social Links */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5 w-full">
            <Button
              asChild
              className="group h-10 flex items-center justify-center gap-2 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-xl theme-btn-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href="#contact">
                <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
              </Link>
            </Button>

            <Button
              asChild
              className="h-10 flex items-center justify-center px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-xl theme-btn-outline shadow-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <Link href="#skills">Our Services</Link>
            </Button>

            {/* Subtle Divider between main CTAs and Social Links */}
            <div className="h-5 w-[1px] bg-slate-300 dark:bg-zinc-700/80 hidden sm:block mx-0.5" />

            {/* Social Links Group */}
            <div className="flex items-center gap-2.5">
              <Button
                asChild
                size="icon"
                className="h-10 w-10 rounded-xl theme-btn-outline shadow-sm transition-all duration-200 hover:scale-105 flex items-center justify-center"
              >
                <Link
                  href="https://x.com/TechSquare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechSquare on X"
                >
                  <FaXTwitter size={15} />
                </Link>
              </Button>
              <Button
                asChild
                size="icon"
                className="h-10 w-10 rounded-xl theme-btn-outline shadow-sm transition-all duration-200 hover:scale-105 flex items-center justify-center"
              >
                <Link
                  href="https://github.com/TechSquare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechSquare GitHub"
                >
                  <FaGithub size={15} />
                </Link>
              </Button>
              <Button
                asChild
                size="icon"
                className="h-10 w-10 rounded-xl theme-btn-outline shadow-sm transition-all duration-200 hover:scale-105 flex items-center justify-center"
              >
                <Link
                  href="https://linkedin.com/company/techsquare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechSquare LinkedIn"
                >
                  <FaLinkedin size={15} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Model Canvas strictly in the right column */}
        <div className="relative w-full h-[360px] sm:h-[400px] md:h-[450px] lg:h-[480px] flex items-center justify-center">
          <TechSquare3D className="w-full h-full" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
