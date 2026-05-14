import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[\d\s+().-]{7,}$/.test(val),
      "Enter a valid phone number or leave this blank.",
    ),
  company: z.string().trim().max(120, "Company name is too long.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a few sentences (10+ characters).")
    .max(4000, "Message is too long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdwedww";

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { errors?: { message: string }[] }
          | null;
        throw new Error(
          data?.errors?.map((error) => error.message).join(", ") ||
            "Something went wrong while sending your message.",
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message.",
      );
    }
  }

  function handleSendAnother() {
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-lg border border-eco/40 bg-eco-soft px-6 py-8 text-ink shadow-sm",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-eco/15 text-eco">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <h2 className="font-display text-xl font-medium tracking-tight text-ink">
              Your message was sent successfully
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-2">
              Thank you for reaching out. Our team has received your enquiry and will respond as
              soon as possible during business hours.
            </p>
            <Button type="button" variant="outline" className="mt-4" onClick={handleSendAnother}>
              Send another message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (optional)</FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" placeholder="+234 …" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company (optional)</FormLabel>
                <FormControl>
                  <Input autoComplete="organization" placeholder="Organisation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your enquiry, timeline, and how we can help."
                  className="min-h-[140px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError ? (
          <p className="text-[14px] leading-relaxed text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}

        <Button type="submit" className="min-h-11 w-full min-w-[140px] sm:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </Form>
  );
}
