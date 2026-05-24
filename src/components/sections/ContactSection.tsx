import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sendContactEmail } from "@/lib/emailjs";
import { CONTACT } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().trim().min(3, "Nome muito curto").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z
    .string()
    .trim()
    .max(20, "Telefone muito longo")
    .optional()
    .or(z.literal("")),
  subject: z.enum(["duvida", "parceria", "denuncia", "outros"], {
    message: "Selecione um assunto",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Mensagem muito curta (mín. 20 caracteres)")
    .max(2000, "Máximo 2000 caracteres"),
  lgpd: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar para continuar" }),
  }),
});

type ContactValues = z.infer<typeof contactSchema>;

const subjectLabels: Record<ContactValues["subject"], string> = {
  duvida: "Dúvida",
  parceria: "Parceria",
  denuncia: "Denúncia",
  outros: "Outros",
};

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const subjectValue = watch("subject");

  const onSubmit = async (data: ContactValues) => {
    setLoading(true);
    setFeedback(null);
    try {
      await sendContactEmail({
        ...data,
        subject: subjectLabels[data.subject],
      });
      toast.success("Mensagem enviada com sucesso!", {
        description: "Em breve nossa equipe entrará em contato.",
      });
      setFeedback({
        type: "success",
        msg: "Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.",
      });
      reset();
      setTimeout(() => feedbackRef.current?.focus(), 50);
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar sua mensagem.", {
        description: "Tente novamente em alguns instantes.",
      });
      setFeedback({
        type: "error",
        msg: "Não foi possível enviar sua mensagem. Tente novamente em alguns instantes.",
      });
      setTimeout(() => feedbackRef.current?.focus(), 50);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className="py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Fale conosco
          </span>
          <h2
            id="contact-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Envie sua mensagem
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tire dúvidas, proponha parcerias ou registre denúncias. Respondemos com cuidado e prioridade.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10"
          noValidate
          aria-label="Formulário de contato"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="name" className="font-semibold">
                Nome completo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="mt-2 min-h-11"
                {...register("name")}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="font-semibold">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="mt-2 min-h-11"
                {...register("email")}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="phone" className="font-semibold">
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(98) 0000-0000"
                className="mt-2 min-h-11"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="subject" className="font-semibold">
                Assunto <span className="text-destructive">*</span>
              </Label>
              <Select
                value={subjectValue}
                onValueChange={(v) =>
                  setValue("subject", v as ContactValues["subject"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  id="subject"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className="mt-2 min-h-11"
                >
                  <SelectValue placeholder="Selecione um assunto" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(subjectLabels).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-destructive">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="font-semibold">
              Mensagem <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              rows={6}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="mt-2"
              {...register("message")}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Campos com <span className="text-destructive">*</span> são obrigatórios.
            </p>
            <Button
              type="submit"
              disabled={loading}
              className="min-h-12 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Enviar mensagem de contato"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </div>

          <div
            ref={feedbackRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={
              feedback
                ? `rounded-md border px-4 py-3 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    feedback.type === "success"
                      ? "border-secondary/40 bg-secondary/10 text-primary"
                      : "border-destructive/40 bg-destructive/10 text-destructive"
                  }`
                : "sr-only"
            }
          >
            {feedback?.msg ?? ""}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
