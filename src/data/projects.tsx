import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const BASE_PATH = "/assets/projects-screenshots";

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

export type Project = {
  id: string;
  category: "Web Development" | "AI Automation" | "Video Editing" | "AI Ads Creation";
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  src: string;
  screenshots: string[];
  capabilities: string[];
  skills?: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode;
  github?: string;
  live: string;
};

const ProjectCTA = ({ live }: { live?: string }) => {
  return (
    <div className="flex flex-wrap items-center justify-start gap-3 my-6">
      {live && live !== "#" && (
        <Button variant="default" size="sm" asChild>
          <Link
            className="flex gap-2 items-center font-medium"
            rel="noopener noreferrer"
            target="_blank"
            href={live}
          >
            Explore Live Platform
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Button>
      )}
      <Button variant="outline" size="sm" asChild>
        <Link href="#contact" className="flex gap-2 items-center font-medium">
          Request Similar Solution
        </Link>
      </Button>
    </div>
  );
};

const MetricBox = ({ value, label }: { value: string; label: string }) => (
  <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-center">
    <div className="text-2xl font-bold font-display text-primary">{value}</div>
    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
  </div>
);

const projects: Project[] = [
  {
    id: "storekit",
    category: "Web Development",
    title: "OmniCommerce Enterprise Platform",
    summary: "High-throughput multi-tenant digital commerce infrastructure engineered for transaction volume, 99.99% uptime, and international scale.",
    metric: "$12.8M+",
    metricLabel: "Quarterly GMV Processed",
    src: "/assets/projects-screenshots/storekit/landing.png",
    screenshots: ["landing.png", "orders.png", "storefront.png", "themes.png"],
    capabilities: [
      "Multi-Tenant Architecture",
      "Automated Payment Routing",
      "Real-Time Inventory Synchronization",
      "Enterprise Fraud Detection",
      "Sub-Second Global Checkout",
    ],
    live: "https://storekit.app/",
    content: (
      <div className="space-y-6">
        <TypographyP className="text-base text-muted-foreground leading-relaxed">
          Engineered for rapid-growth commercial brands requiring zero downtime and seamless omnichannel transactions. The platform provides complete merchant autonomy with automated order fulfillment, multi-currency handling, and custom visual storefront customization.
        </TypographyP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <MetricBox value="$12.8M+" label="Transaction Volume" />
          <MetricBox value="99.99%" label="Production Uptime" />
          <MetricBox value="420ms" label="Global P99 Checkout" />
        </div>

        <ProjectCTA live="https://storekit.app/" />

        <TypographyH3 className="text-xl font-bold font-display">The Commercial Challenge</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          The client needed to replace legacy third-party software that suffered from transaction fees, high latency during flash sales, and fragmented inventory reporting across four core retail verticals.
        </TypographyP>

        <TypographyH3 className="text-xl font-bold font-display">Strategic Solution Delivered</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          TechSquare architected an enterprise-grade platform uniting customer-facing digital storefronts, merchant management control centers, real-time point-of-sale hardware sync, and intelligent inventory predictive restocking. Webhook retry mechanisms prevent duplicate billing under extreme traffic spikes.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/storekit/orders.png`,
            `${BASE_PATH}/storekit/login.png`,
          ]}
        />

        <TypographyH3 className="text-xl font-bold font-display">Commercial Impact &amp; ROI</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Within the first two quarters of deployment, checkout completion improved by 34%, merchant onboarding overhead was eliminated through automated workflows, and total processing costs fell by 48%.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/storekit/storefront.png`,
            `${BASE_PATH}/storekit/themes.png`,
          ]}
        />
      </div>
    ),
  },
  {
    id: "unottr",
    category: "AI Automation",
    title: "NeuralDoc Enterprise Knowledge Engine",
    summary: "Autonomous audio-to-structured-data automation system that transcribes, synthesizes, and routes executive intelligence into enterprise ERPs.",
    metric: "85%",
    metricLabel: "Executive Time Saved",
    src: "/assets/projects-screenshots/unottr/landing.webp",
    screenshots: ["landing.webp", "ai-connection.png", "transcript.png", "overview.png"],
    capabilities: [
      "Autonomous Voice Synthesis",
      "Executive Brief Generation",
      "Automated ERP Integration",
      "Privacy-First Data Isolation",
      "Cross-Departmental Action Routing",
    ],
    live: "https://unottr.pages.dev",
    content: (
      <div className="space-y-6">
        <TypographyP className="text-base text-muted-foreground leading-relaxed">
          An autonomous business intelligence pipeline that captures multi-speaker corporate meetings, distills mission-critical action items, and instantly updates enterprise databases without manual data entry.
        </TypographyP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <MetricBox value="85%" label="Manual Entry Reduced" />
          <MetricBox value="100%" label="Internal Privacy Compliance" />
          <MetricBox value="4.8h" label="Saved Per Executive Weekly" />
        </div>

        <ProjectCTA live="https://unottr.pages.dev" />

        <TypographyH3 className="text-xl font-bold font-display">The Operational Bottleneck</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Enterprise leaders spent over 20 hours each week manually documenting high-stakes strategic discussions, extracting follow-ups, and transcribing deliverables into disparate project management systems.
        </TypographyP>

        <TypographyH3 className="text-xl font-bold font-display">Strategic Solution Delivered</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          TechSquare engineered a privacy-centric AI intelligence pipeline that securely ingests audio streams, identifies organizational stakeholders, extracts commitments, and formats structured briefings mapped directly to enterprise workflows.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/unottr/transcript.png`,
            `${BASE_PATH}/unottr/ai-connection.png`,
          ]}
        />

        <TypographyH3 className="text-xl font-bold font-display">Commercial Impact &amp; ROI</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Achieved complete elimination of meeting documentation backlog, zero data leaks through localized processing safeguards, and enabled senior leadership teams to redirect hundreds of hours toward strategic execution.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/unottr/overview.png`,
            `${BASE_PATH}/unottr/library.png`,
          ]}
        />
      </div>
    ),
  },
  {
    id: "peakposts",
    category: "AI Ads Creation",
    title: "HyperScale Creative AI Ad Generation Engine",
    summary: "Predictive multi-variant AI advertising system generating hundreds of high-ROAS creative variants optimized for social conversion.",
    metric: "4.4x",
    metricLabel: "Average Return on Ad Spend",
    src: "/assets/projects-screenshots/peakposts/landing.png",
    screenshots: ["landing.png", "dashboard.png", "posts.png"],
    capabilities: [
      "Automated Variant Generation",
      "Audience Intent Modeling",
      "Dynamic Copy Optimization",
      "Omnichannel Asset Formatting",
      "Predictive Conversion Scoring",
    ],
    live: "https://peakposts.com",
    content: (
      <div className="space-y-6">
        <TypographyP className="text-base text-muted-foreground leading-relaxed">
          A high-velocity creative engine built for high-growth direct-to-consumer and B2B brands looking to continuously test, scale, and optimize multimedia advertising without expanding internal headcount.
        </TypographyP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <MetricBox value="4.4x" label="Verified ROAS" />
          <MetricBox value="-42%" label="Customer Acquisition Cost" />
          <MetricBox value="300+" label="Ad Variants Monthly" />
        </div>

        <ProjectCTA live="https://peakposts.com" />

        <TypographyH3 className="text-xl font-bold font-display">The Growth Challenge</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Ad creative fatigue was causing customer acquisition costs to spike by 60% month-over-month. The brand could not produce high-quality video and image variations fast enough to maintain profitable campaign performance.
        </TypographyP>

        <TypographyH3 className="text-xl font-bold font-display">Strategic Solution Delivered</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          TechSquare developed an algorithmic creative generation pipeline that ingests core brand assets and automatically produces dozens of high-performing visual hooks, tailored copy angles, and multi-platform aspect ratios in minutes.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/peakposts/dashboard.png`,
            `${BASE_PATH}/peakposts/posts.png`,
          ]}
        />

        <TypographyH3 className="text-xl font-bold font-display">Commercial Impact &amp; ROI</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Customer acquisition costs fell by 42% in 45 days, ad spend profitability increased from 1.8x to 4.4x, and the marketing team reduced campaign turnaround from 2 weeks to 3 hours.
        </TypographyP>
      </div>
    ),
  },
  {
    id: "gumbalup",
    category: "Video Editing",
    title: "VividMotion Brand Studio & Post-Production",
    summary: "High-fidelity video post-production, motion graphics, and visual design assets produced for omnichannel consumer brands.",
    metric: "3.6x",
    metricLabel: "Audience Engagement Lift",
    src: "/assets/projects-screenshots/gumbalup/landing.png",
    screenshots: ["landing.png", "dashboard.png", "editor.png", "library.png"],
    capabilities: [
      "Commercial Brand Films",
      "Motion Identity & 3D Typography",
      "High-Retention Social Editing",
      "Color Grading & Audio Mastering",
      "Omnichannel Multi-Format Delivery",
    ],
    live: "https://gumbalup.com",
    content: (
      <div className="space-y-6">
        <TypographyP className="text-base text-muted-foreground leading-relaxed">
          Comprehensive creative post-production studio providing high-end video editing, kinetic motion identity, and multi-platform commercial assets for top-tier lifestyle and corporate brands.
        </TypographyP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <MetricBox value="3.6x" label="Engagement Lift" />
          <MetricBox value="24h" label="Average Turnaround" />
          <MetricBox value="12M+" label="Organic Video Views" />
        </div>

        <ProjectCTA live="https://gumbalup.com" />

        <TypographyH3 className="text-xl font-bold font-display">The Brand Challenge</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          The client suffered from disjointed brand visuals and uninspiring product explainers that generated high bounce rates and low viewer retention across digital advertising and social channels.
        </TypographyP>

        <TypographyH3 className="text-xl font-bold font-display">Strategic Solution Delivered</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          TechSquare established an integrated post-production workflow utilizing cinema-grade color science, custom motion graphics packages, rhythmic pacing, and bespoke audio sound design to maximize watch-time and brand trust.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/gumbalup/editor.png`,
            `${BASE_PATH}/gumbalup/dashboard.png`,
          ]}
        />

        <TypographyH3 className="text-xl font-bold font-display">Commercial Impact &amp; ROI</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Video completion rates surged past 78%, social engagement more than tripled, and inbound enterprise sales inquiries increased by 54% following the premiere of the new corporate brand film suite.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/gumbalup/library.png`,
            `${BASE_PATH}/gumbalup/landing.png`,
          ]}
        />
      </div>
    ),
  },
  {
    id: "kanbi",
    category: "Web Development",
    title: "AgileOps Collaborative Workflow Suite",
    summary: "Real-time enterprise project management and resource orchestration platform delivering synchronized team velocity analytics.",
    metric: "+140%",
    metricLabel: "Execution Velocity Increase",
    src: "/assets/projects-screenshots/kanbi/landing.png",
    screenshots: ["landing.png", "board.png", "ai-draft.png", "dashboard.png"],
    capabilities: [
      "Real-Time Collaborative Canvas",
      "Executive Telemetry & Reporting",
      "Role-Based Access Governance",
      "Automated Milestone Tracking",
      "Enterprise Workflow Triggers",
    ],
    live: "https://kanbi.pages.dev",
    content: (
      <div className="space-y-6">
        <TypographyP className="text-base text-muted-foreground leading-relaxed">
          A synchronized operations system that bridges corporate strategy and distributed execution, giving leadership real-time visibility into project health and team capacity without bureaucratic overhead.
        </TypographyP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <MetricBox value="+140%" label="Velocity Increase" />
          <MetricBox value="0ms" label="Sync Conflict Loss" />
          <MetricBox value="1,200+" label="Daily Active Teammates" />
        </div>

        <ProjectCTA live="https://kanbi.pages.dev" />

        <TypographyH3 className="text-xl font-bold font-display">The Organizational Challenge</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Dispersed product and operations teams were bogged down by stale spreadsheets, conflicting project states, and delayed status handoffs, slowing down quarterly feature releases.
        </TypographyP>

        <TypographyH3 className="text-xl font-bold font-display">Strategic Solution Delivered</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          TechSquare engineered a collaborative enterprise portal featuring instantaneous multi-user state synchronization, role-based security clearance, and automated project milestone forecasting.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/kanbi/board.png`,
            `${BASE_PATH}/kanbi/ai-draft.png`,
          ]}
        />

        <TypographyH3 className="text-xl font-bold font-display">Commercial Impact &amp; ROI</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Cross-functional cycle time decreased from 28 days to 11 days, project transparency reached 100% across executive stakeholders, and sprint planning efficiency climbed by 65%.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/kanbi/dashboard.png`,
            `${BASE_PATH}/kanbi/settings.png`,
          ]}
        />
      </div>
    ),
  },
  {
    id: "codingducks",
    category: "AI Automation",
    title: "Cognitive Talent Assessment & Skill Engine",
    summary: "Automated candidate evaluation pipeline reducing technical hiring overhead by 72% through real-time code simulation and benchmarking.",
    metric: "72%",
    metricLabel: "Hiring Overhead Reduction",
    src: "/assets/projects-screenshots/codingducks/landing.png",
    screenshots: ["landing.png", "problems.png", "contests.png", "user.png"],
    capabilities: [
      "Automated Code Sandbox Simulation",
      "Algorithmic Performance Benchmarking",
      "Cheat Prevention & Integrity Guards",
      "Executive Candidate Dossiers",
      "Applicant Tracking System Integration",
    ],
    live: "https://codingducks.xyz",
    content: (
      <div className="space-y-6">
        <TypographyP className="text-base text-muted-foreground leading-relaxed">
          An automated technical talent screening platform that replaces hundreds of hours of manual engineering interviews with objective, sandbox-tested practical evaluations.
        </TypographyP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <MetricBox value="72%" label="Interview Time Saved" />
          <MetricBox value="98.4%" label="Candidate Satisfaction" />
          <MetricBox value="3.5x" label="Faster Time-to-Offer" />
        </div>

        <ProjectCTA live="https://codingducks.xyz" />

        <TypographyH3 className="text-xl font-bold font-display">The Recruiting Challenge</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Engineering leads spent over 25% of their working hours conducting preliminary technical interviews, resulting in lost roadmap velocity and inconsistent candidate evaluation criteria.
        </TypographyP>

        <TypographyH3 className="text-xl font-bold font-display">Strategic Solution Delivered</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          TechSquare developed an interactive assessment engine with automated code execution environments, edge-case validation suites, and instant candidate ranking analytics mapped directly to hiring standards.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/codingducks/problems.png`,
            `${BASE_PATH}/codingducks/contests.png`,
          ]}
        />

        <TypographyH3 className="text-xl font-bold font-display">Commercial Impact &amp; ROI</TypographyH3>
        <TypographyP className="text-sm text-muted-foreground leading-relaxed">
          Hiring turnaround dropped from 42 days to 12 days, bad-hire false positives dropped to near zero, and senior engineers reclaimed more than 300 collective hours per quarter.
        </TypographyP>

        <SlideShow
          images={[
            `${BASE_PATH}/codingducks/user.png`,
            `${BASE_PATH}/codingducks/users.png`,
          ]}
        />
      </div>
    ),
  },
];

export default projects;
