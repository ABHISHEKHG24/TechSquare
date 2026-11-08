import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const ContactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  company: z.string().optional(),
  services: z.array(z.string()).optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters detailing your project"),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = ContactSchema.safeParse(body);

    if (!zodSuccess) {
      return Response.json({ error: zodError?.issues[0]?.message || "Invalid submission" }, { status: 400 });
    }

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "TechSquare Inquiries <onboarding@resend.dev>",
      to: [config.email],
      subject: `New Project Inquiry from ${zodData.fullName}`,
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        company: zodData.company,
        services: zodData.services,
        budget: zodData.budget,
        message: zodData.message,
      }) as React.ReactElement,
    });

    if (resendError) {
      return Response.json({ error: "Failed to send consultation inquiry" }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error) {
    return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
