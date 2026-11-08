"use client";
import { ChevronRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please provide at least 10 characters detailing your project"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse({
      fullName,
      email,
      message,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll review your project and get back to you within 24 hours.",
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4 z-50"),
      });

      setLoading(false);
      setFullName("");
      setEmail("");
      setMessage("");

      const timer = setTimeout(() => {
        router.push("/");
        clearTimeout(timer);
      }, 1500);
    } catch {
      toast({
        title: "Unable to Send Message",
        description: "We were unable to send your message. Please reach us directly via email.",
        className: cn("top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4 z-50"),
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit} aria-busy={loading}>
      {/* Name & Email Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LabelInputContainer>
          <Label htmlFor="fullname" className="text-slate-900 dark:text-zinc-200 font-semibold">Full Name *</Label>
          <Input
            id="fullname"
            placeholder="Jane Doe"
            type="text"
            suppressHydrationWarning
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors((p) => ({ ...p, fullName: undefined }));
            }}
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="email" className="text-slate-900 dark:text-zinc-200 font-semibold">Email Address *</Label>
          <Input
            id="email"
            placeholder="jane@example.com"
            type="email"
            suppressHydrationWarning
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: undefined }));
            }}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </LabelInputContainer>
      </div>

      {/* Project Details */}
      <div className="space-y-2">
        <Label htmlFor="content" className="text-slate-900 dark:text-zinc-200 font-semibold">Project Details *</Label>
        <Textarea
          id="content"
          placeholder="Tell us about what you're looking to build, your timeline, or any questions..."
          rows={5}
          suppressHydrationWarning
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((p) => ({ ...p, message: undefined }));
          }}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      {/* Footer Text */}
      <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
        Send us a message and one of our developers will reply shortly.
      </p>

      {/* Submit Button */}
      <Button
        disabled={loading}
        className="w-full h-12 rounded-xl font-semibold text-sm sm:text-base theme-btn-primary shadow-lg transition-all duration-200 cursor-pointer"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending Message...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>Send Message</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 w-full", className)}>
      {children}
    </div>
  );
};
