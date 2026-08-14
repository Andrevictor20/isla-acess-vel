import { useRef, useState } from 'react';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().trim().min(3, 'Nome muito curto').max(100, 'Máximo 100 caracteres'),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().max(20, 'Telefone muito longo').optional().or(z.literal('')),
  subject: z.enum(['duvida', 'parceria', 'denuncia', 'outros'], {
    message: 'Selecione um assunto',
  }),
  message: z
    .string()
    .trim()
    .min(20, 'Mensagem muito curta (mín. 20 caracteres)')
    .max(2000, 'Máximo 2000 caracteres'),
  lgpd: z.literal(true, {
    errorMap: () => ({ message: 'Você precisa aceitar para continuar' }),
  }),
});

type ContactValues = z.infer<typeof contactSchema>;

const subjectLabels: Record<ContactValues['subject'], string> = {
  duvida: 'Dúvida',
  parceria: 'Parceria',
  denuncia: 'Denúncia',
  outros: 'Outros',
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ContactValues>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const feedbackRef = useRef<HTMLDivElement>(null);

  const set = (field: keyof ContactValues, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse({ ...formData, lgpd: formData.lgpd === true ? true : undefined });
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactValues;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, subject: subjectLabels[result.data.subject] }),
      });
      if (!res.ok) throw new Error();
      setFeedback({ type: 'success', msg: 'Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.' });
      setFormData({});
      setTimeout(() => feedbackRef.current?.focus(), 50);
    } catch {
      setFeedback({ type: 'error', msg: 'Não foi possível enviar sua mensagem. Tente novamente em alguns instantes.' });
      setTimeout(() => feedbackRef.current?.focus(), 50);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mt-10 grid gap-5 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow-soft)] md:p-10"
        noValidate
        aria-label="Formulário de contato"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[var(--foreground)]">
              Nome completo <span className="text-[var(--destructive)]">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={(formData.name as string) ?? ''}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="mt-2 w-full min-h-11 rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
            />
            {errors.name && <p id="name-error" role="alert" className="mt-1 text-sm text-[var(--destructive)]">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[var(--foreground)]">
              Email <span className="text-[var(--destructive)]">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={(formData.email as string) ?? ''}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="mt-2 w-full min-h-11 rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
            />
            {errors.email && <p id="email-error" role="alert" className="mt-1 text-sm text-[var(--destructive)]">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[var(--foreground)]">Telefone</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(98) 0000-0000"
              value={(formData.phone as string) ?? ''}
              onChange={(e) => set('phone', e.target.value)}
              className="mt-2 w-full min-h-11 rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-[var(--foreground)]">
              Assunto <span className="text-[var(--destructive)]">*</span>
            </label>
            <select
              id="subject"
              value={(formData.subject as string) ?? ''}
              onChange={(e) => set('subject', e.target.value)}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className="mt-2 w-full min-h-11 rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
            >
              <option value="">Selecione um assunto</option>
              {Object.entries(subjectLabels).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {errors.subject && <p id="subject-error" role="alert" className="mt-1 text-sm text-[var(--destructive)]">{errors.subject}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[var(--foreground)]">
            Mensagem <span className="text-[var(--destructive)]">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            value={(formData.message as string) ?? ''}
            onChange={(e) => set('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="mt-2 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
          />
          {errors.message && <p id="message-error" role="alert" className="mt-1 text-sm text-[var(--destructive)]">{errors.message}</p>}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-4">
          <label className="flex items-start gap-3 text-sm">
            <input
              id="lgpd"
              type="checkbox"
              checked={formData.lgpd === true}
              onChange={(e) => set('lgpd', e.target.checked)}
              aria-invalid={!!errors.lgpd}
              aria-describedby={errors.lgpd ? 'lgpd-error' : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-[var(--border)]"
              style={{ accentColor: 'var(--primary)' }}
            />
            <span className="text-[var(--foreground)]/85">
              Li e concordo com o tratamento dos meus dados pessoais pelo ISLA conforme a{' '}
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="font-semibold text-[var(--primary)] underline underline-offset-2 hover:text-[var(--secondary)]"
              >
                Política de Privacidade
              </button>{' '}
              (LGPD — Lei 13.709/2018). <span className="text-[var(--destructive)]">*</span>
            </span>
          </label>
          {errors.lgpd && <p id="lgpd-error" role="alert" className="mt-2 text-sm text-[var(--destructive)]">{errors.lgpd}</p>}
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--muted-foreground)]">
            Campos com <span className="text-[var(--destructive)]">*</span> são obrigatórios.
          </p>
          <button
            type="submit"
            disabled={loading}
            aria-label="Enviar mensagem de contato"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-2 text-sm font-bold text-[var(--primary-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--primary)_90%,black)] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Enviando…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Enviar Mensagem
              </>
            )}
          </button>
        </div>

        <div
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={
            feedback
              ? `rounded-md border px-4 py-3 text-sm font-semibold focus:outline-none ${
                  feedback.type === 'success'
                    ? 'border-[var(--secondary)]/40 bg-[color-mix(in_oklab,var(--secondary)_10%,transparent)] text-[var(--primary)]'
                    : 'border-[var(--destructive)]/40 bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] text-[var(--destructive)]'
                }`
              : 'sr-only'
          }
        >
          {feedback?.msg ?? ''}
        </div>
      </form>

      {/* Privacy Policy modal */}
      {privacyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Fechar modal"
            className="absolute inset-0 bg-black/50 cursor-default"
            onClick={() => setPrivacyOpen(false)}
          />
          <div className="relative max-w-lg w-full rounded-2xl bg-[var(--card)] p-6 shadow-[var(--shadow-elegant)]">
            <h2 id="privacy-title" className="text-lg font-bold text-[var(--primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Política de Privacidade
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/80">
              O Instituto São Luís Acessível coleta os dados informados neste formulário (nome, email,
              telefone e mensagem) exclusivamente para responder ao seu contato. Seus dados não são
              compartilhados com terceiros e são armazenados de forma segura. Você pode solicitar a
              exclusão dos seus dados a qualquer momento pelo email{' '}
              <a href="mailto:contato@isla.org.br" className="font-semibold text-[var(--primary)] underline">
                contato@isla.org.br
              </a>
              . Conforme a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
            </p>
            <button
              type="button"
              onClick={() => setPrivacyOpen(false)}
              className="mt-4 inline-flex min-h-10 items-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]"
              aria-label="Fechar política de privacidade"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
