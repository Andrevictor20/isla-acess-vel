import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Olá! Gostaria de saber mais sobre o Instituto São Luís Acessível.',
  );
  const url = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Conversar com o ISLA pelo WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-elegant)] transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
