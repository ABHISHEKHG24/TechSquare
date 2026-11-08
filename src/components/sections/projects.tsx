"use client";
import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

import projects, { Project } from "@/data/projects";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const CATEGORIES = [
  "All",
  "Web Development",
  "AI Automation",
  "Video Editing",
  "AI Ads Creation",
] as const;

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <SectionWrapper
      id="projects"
      className="max-w-7xl mx-auto md:min-h-[130vh] px-4 pt-12 md:pt-16"
    >
      <SectionHeader id="projects" title="Agency Portfolio" className="relative mb-12 md:mb-16" />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((category) => {
          const count =
            category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length;
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 border cursor-pointer",
                isActive
                  ? "bg-slate-900 text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200/80 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 text-muted-foreground hover:text-foreground border-slate-200 dark:border-zinc-800"
              )}
            >
              <span>{category}</span>
              <span className="ml-1.5 opacity-60 text-xs">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              key={project.id}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center w-full">
      <ResponsiveDialog>
        <ResponsiveDialogTrigger className="bg-transparent flex justify-center w-full text-left">
          <div
            className="group relative w-full h-auto rounded-xl overflow-hidden ring-1 ring-border/50 hover:ring-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
            style={{ aspectRatio: "3/2" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            <ScrollingPreview
              src={project.src}
              alt={project.title}
              bg={`/assets/backgrounds/${project.id}.jpg`}
              isHovered={isHovered}
            />

            {/* Gradient Overlay & Details */}
            <div className="absolute w-full h-32 bottom-0 left-0 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none z-10">
              <div className="flex flex-col h-full items-start justify-end p-4">
                <div className="flex items-center justify-between w-full mb-1 gap-2">
                  <span className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-0.5">
                    {project.category}
                  </span>
                  {project.metric && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      {project.metric}
                    </span>
                  )}
                </div>
                <div className="text-base sm:text-lg font-bold text-foreground line-clamp-1">
                  {project.title}
                </div>
              </div>
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ResponsiveDialogContent className="md:max-w-4xl md:h-[85vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
          {/* Sticky header */}
          <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-8 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <h4 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
                  {project.title}
                </h4>
                <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
                  {project.category}
                </span>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                {project.live && project.live !== "#" && (
                  <Link
                    href={project.live}
                    target="_blank"
                    className="group inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <span>Visit Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <ScrollArea className="flex-1" type="always" data-lenis-prevent>
            <div className="px-8 py-8">
              {/* Capabilities chips */}
              {project.capabilities && project.capabilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold block mb-2.5">
                    Core Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-zinc-800 text-foreground border border-slate-200 dark:border-zinc-700"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Legacy skills support if present */}
              {((project.skills?.frontend && project.skills.frontend.length > 0) ||
                (project.skills?.backend && project.skills.backend.length > 0)) && (
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
                  {project.skills?.frontend && project.skills.frontend.length > 0 && (
                    <div className="flex flex-col items-center md:items-start gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                        Architecture
                      </span>
                      <FloatingDock items={project.skills.frontend} />
                    </div>
                  )}
                  {project.skills?.backend && project.skills.backend.length > 0 && (
                    <div className="flex flex-col items-center md:items-start gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                        Infrastructure
                      </span>
                      <FloatingDock items={project.skills.backend} />
                    </div>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

              {/* Project content */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {project.content}
              </motion.div>
            </div>
          </ScrollArea>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default ProjectsSection;
