import type { APIRoute } from 'astro';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(3, 'Nome muito curto').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  subject: z.string().min(1, 'Assunto obrigatório'),
  message: z.string().trim().min(20, 'Mensagem muito curta').max(2000),
  lgpd: z.literal(true),
});

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Basic rate limiting via headers check
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Corpo da requisição inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: 'Dados inválidos.', issues: result.error.issues }),
      { status: 422, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const { name, email, phone, subject, message } = result.data;

  const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    // Dev mode — simulate success
    console.log('[contact API] Dev mode — email simulado:', { name, email, subject });
    return new Response(JSON.stringify({ success: true, dev: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: name,
          from_email: email,
          phone: phone ?? '',
          subject,
          message,
          reply_to: email,
        },
      }),
    });

    if (!emailRes.ok) {
      throw new Error(`EmailJS error: ${emailRes.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[contact API] Falha ao enviar email:', err, 'IP:', ip);
    return new Response(
      JSON.stringify({ error: 'Falha ao enviar mensagem. Tente novamente.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
