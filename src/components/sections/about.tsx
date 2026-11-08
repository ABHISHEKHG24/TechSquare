"use client";

import React from "react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { ShieldCheck, Zap, Target, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const PRINCIPLES = [
  {
    icon: Users,
    title: "Direct Communication",
    description:
      "No account managers or middlemen. Every project is scoped, coded, and delivered directly by our team of developers.",
  },
  {
    icon: Zap,
    title: "Tech & Creative Combined",
    description:
      "We eliminate the hassle of hiring multiple separate freelancers by bringing web development, automation, video editing, and ad creation under one roof.",
  },
  {
    icon: Target,
    title: "Results Focused",
    description:
      "We build things that actually help your business grow—whether that is saving you hours with smart automations or getting more clicks with high-quality media.",
  },
  {
    icon: ShieldCheck,
    title: "Clean & Reliable",
    description:
      "Every website, app, and media asset we build is cleanly coded, secure, and delivered on time.",
  },
];

const AboutSection = () => {
  return (
    <SectionWrapper id="about" className="relative z-10 flex w-full min-h-screen flex-col justify-center py-20 md:py-28 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeader
          id="about"
          title="About TechSquare"
          desc="An agile collective of specialized developers and multidisciplinary creatives."
          className="static mb-14 md:mb-16"
        />

        {/* Mission Manifesto */}
        <div className="relative overflow-hidden rounded-3xl border section-theme-card p-8 sm:p-12 mb-12 shadow-sm">
          <div className="max-w-4xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display section-theme-title tracking-tight leading-snug">
              Traditional agencies slow things down with middlemen and bloated hours. We do the opposite.
            </h3>
            <p className="mt-4 text-base sm:text-lg section-theme-desc leading-relaxed">
              TechSquare is a dedicated collective of developers and creators. Whether you need custom web development, workflow automation, video editing, or digital ads, you collaborate directly with the specialists actually doing the work.
            </p>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border section-theme-card p-6 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold section-theme-desc opacity-70">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold section-theme-title mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm section-theme-desc leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation Callout */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border section-theme-card shadow-sm">
          <div>
            <h4 className="text-lg sm:text-xl font-bold section-theme-title">
              Ready to start your next project?
            </h4>
            <p className="text-xs sm:text-sm section-theme-desc mt-1">
              Speak directly with our developers to discuss your requirements and timeline.
            </p>
          </div>
          <Button asChild className="shrink-0 rounded-xl px-6 py-5 font-semibold theme-btn-primary shadow-md">
            <Link href="#contact" className="inline-flex items-center gap-2">
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
