import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/constants";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const msg = encodeURIComponent(
    "Olá! Vim pelo site do ISLA e gostaria de mais informações.",
  );
  const href = CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${msg}`
    : "#";

  if (!visible) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar com o ISLA pelo WhatsApp"
      className="fixed bottom-20 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant ring-4 ring-[#25D366]/25 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.03 0C5.45 0 .08 5.37.08 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.94 11.94 0 0 0 5.79 1.48h.01c6.58 0 11.95-5.37 11.95-11.95 0-3.19-1.24-6.19-3.47-8.41ZM12.04 21.8h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.83 9.83 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.87-9.87 2.64 0 5.11 1.03 6.98 2.9a9.79 9.79 0 0 1 2.89 6.98c0 5.44-4.43 9.84-9.89 9.84Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.86 1.21 3.06c.15.2 2.1 3.21 5.1 4.5.71.31 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.27.17-1.4-.07-.13-.27-.2-.57-.35Z"/>
      </svg>
    </a>
  );
}
