"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Mail, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl mx-auto px-4 py-20 md:py-28">
      <SectionHeader
        id="contact"
        title="Let's Work Together"
        desc="Reach out directly to our team. Tell us what you need, and we'll let you know how we can help."
        className="relative mb-12 md:mb-16"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Overview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border section-theme-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                Engagement Model
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display section-theme-title">
                How We Work With You
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 font-bold text-xs font-mono">
                  01
                </div>
                <div>
                  <h5 className="text-sm font-semibold section-theme-title">01 - Reach Out</h5>
                  <p className="text-xs section-theme-desc mt-0.5 leading-relaxed">
                    Send us a message with a quick overview of your project.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 font-bold text-xs font-mono">
                  02
                </div>
                <div>
                  <h5 className="text-sm font-semibold section-theme-title">02 - Quick Chat</h5>
                  <p className="text-xs section-theme-desc mt-0.5 leading-relaxed">
                    We&apos;ll have a brief call or chat to understand your technical requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 font-bold text-xs font-mono">
                  03
                </div>
                <div>
                  <h5 className="text-sm font-semibold section-theme-title">03 - Clear Plan</h5>
                  <p className="text-xs section-theme-desc mt-0.5 leading-relaxed">
                    We provide a straightforward timeline and pricing before we start any work.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm section-theme-desc">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="font-semibold section-theme-title">Direct Inquiries:</span>
                <Link
                  href={`mailto:${config.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition-colors flex items-center gap-1 font-medium"
                >
                  {config.email}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm section-theme-desc">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Response Time: Usually within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card Column (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="border section-theme-card rounded-2xl shadow-sm p-6 sm:p-8">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold font-display section-theme-title">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm section-theme-desc mt-1">
                Fill out the form below to reach our developers directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
