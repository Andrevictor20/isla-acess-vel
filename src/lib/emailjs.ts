import emailjs from "@emailjs/browser";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

  if (!serviceId || !templateId || !publicKey) {
    // Simulate success in development if EmailJS not configured
    await new Promise((r) => setTimeout(r, 800));
    console.warn("[EmailJS] Variáveis de ambiente não configuradas. Mensagem simulada:", data);
    return { status: 200, text: "simulated" };
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone ?? "",
      subject: data.subject,
      message: data.message,
      reply_to: data.email,
    },
    publicKey,
  );
};
