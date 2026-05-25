import { useEffect, useState } from "react";
import {
  Accessibility,
  X,
  Type,
  Contrast,
  Underline,
  PauseCircle,
  BookOpen,
  RotateCcw,
  Minus,
  Plus,
  Volume2,
  VolumeX,
  Moon,
} from "lucide-react";

type Prefs = {
  fontScale: number;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  ttsActive: boolean;
  darkMode: boolean;
};

const DEFAULT: Prefs = {
  fontScale: 1,
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
  dyslexiaFont: false,
  ttsActive: false,
  darkMode: false,
};

const STORAGE_KEY = "isla-a11y-prefs";

function applyPrefs(p: Prefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--a11y-font-scale", String(p.fontScale));
  root.classList.toggle("a11y-high-contrast", p.highContrast);
  root.classList.toggle("a11y-underline-links", p.underlineLinks);
  root.classList.toggle("a11y-reduce-motion", p.reduceMotion);
  root.classList.toggle("a11y-dyslexia", p.dyslexiaFont);
  root.classList.toggle("dark", p.darkMode);
}

let ttsKeepAlive: ReturnType<typeof setInterval> | null = null;

function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  if (ttsKeepAlive) {
    clearInterval(ttsKeepAlive);
    ttsKeepAlive = null;
  }
}

function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "pt-BR") ||
    voices.find((v) => v.lang.startsWith("pt")) ||
    voices[0] ||
    null
  );
}

function speakChunked(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stopSpeaking();
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 1);
  if (sentences.length === 0) return;
  let index = 0;
  const speakNext = () => {
    if (index >= sentences.length) {
      stopSpeaking();
      return;
    }
    const utt = new SpeechSynthesisUtterance(sentences[index]);
    utt.lang = "pt-BR";
    utt.rate = 0.85;
    utt.pitch = 1;
    const voice = getBestVoice();
    if (voice) utt.voice = voice;
    utt.onend = () => {
      index++;
      speakNext();
    };
    utt.onerror = () => {
      index++;
      speakNext();
    };
    window.speechSynthesis.speak(utt);
  };
  ttsKeepAlive = setInterval(() => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }, 10_000);
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", speakNext, { once: true });
  } else {
    speakNext();
  }
}

function speakShort(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "pt-BR";
  utt.rate = 0.9;
  const voice = getBestVoice();
  if (voice) utt.voice = voice;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      () => {
        const v = getBestVoice();
        if (v) utt.voice = v;
        window.speechSynthesis.speak(utt);
      },
      { once: true },
    );
  } else {
    window.speechSynthesis.speak(utt);
  }
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT, ...JSON.parse(raw) } as Prefs;
        setPrefs(parsed);
        applyPrefs(parsed);
      } else {
        applyPrefs(DEFAULT);
      }
    } catch {
      applyPrefs(DEFAULT);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyPrefs(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs, mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // TTS hover handler
  useEffect(() => {
    if (!prefs.ttsActive) return;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let lastSpoken = "";
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const text = el.innerText?.trim() ?? "";
      if (text.length < 2 || text.length > 300 || text === lastSpoken) return;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        lastSpoken = text;
        speakShort(text);
      }, 350);
    };
    document.addEventListener("mouseover", handler);
    return () => {
      document.removeEventListener("mouseover", handler);
      if (debounceTimer) clearTimeout(debounceTimer);
      stopSpeaking();
    };
  }, [prefs.ttsActive]);

  const update = <K extends keyof Prefs>(k: K, v: Prefs[K]) =>
    setPrefs((p) => ({ ...p, [k]: v }));

  const toggleTTS = (active: boolean) => {
    update("ttsActive", active);
    if (!active) stopSpeaking();
  };

  const reset = () => {
    stopSpeaking();
    setPrefs(DEFAULT);
  };

  const fontSteps = [1, 1.15, 1.3, 1.5];
  const incFont = () => {
    const idx = fontSteps.findIndex((s) => s >= prefs.fontScale);
    const next = fontSteps[Math.min(fontSteps.length - 1, (idx < 0 ? 0 : idx) + 1)];
    update("fontScale", next);
  };
  const decFont = () => {
    const idx = fontSteps.findIndex((s) => s >= prefs.fontScale);
    const next = fontSteps[Math.max(0, (idx < 0 ? 0 : idx) - 1)];
    update("fontScale", next);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar opções de acessibilidade" : "Abrir opções de acessibilidade"}
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="fixed bottom-5 left-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant ring-4 ring-secondary/30 transition-transform hover:scale-105 focus-visible:scale-105"
      >
        <Accessibility className="h-7 w-7" aria-hidden="true" />
      </button>

      {prefs.ttsActive && (
        <button
          type="button"
          onClick={() => {
            const main = document.querySelector("main");
            if (main) speakChunked((main as HTMLElement).innerText);
          }}
          className="fixed bottom-5 left-24 z-[60] inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white shadow-elegant"
          aria-label="Ouvir conteúdo da página"
        >
          <Volume2 className="h-4 w-4" aria-hidden="true" />
          Ouvir página
        </button>
      )}

      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Opções de acessibilidade"
          className="fixed bottom-24 left-5 z-[60] w-[320px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-elegant"
        >
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Accessibility className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-heading text-sm font-bold">Acessibilidade</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar painel de acessibilidade"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[80vh] space-y-4 overflow-y-auto p-4">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
                <Type className="h-4 w-4" aria-hidden="true" />
                Tamanho do texto
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decFont}
                  disabled={prefs.fontScale <= fontSteps[0]}
                  aria-label="Diminuir tamanho do texto"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary hover:bg-secondary/10 disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div
                  className="flex-1 rounded-md border border-border bg-background py-2 text-center text-sm font-semibold tabular-nums"
                  aria-live="polite"
                >
                  {Math.round(prefs.fontScale * 100)}%
                </div>
                <button
                  type="button"
                  onClick={incFont}
                  disabled={prefs.fontScale >= fontSteps[fontSteps.length - 1]}
                  aria-label="Aumentar tamanho do texto"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary hover:bg-secondary/10 disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ToggleRow
              icon={Contrast}
              label="Alto contraste"
              checked={prefs.highContrast}
              onChange={(v) => update("highContrast", v)}
            />
            <ToggleRow
              icon={Underline}
              label="Sublinhar links"
              checked={prefs.underlineLinks}
              onChange={(v) => update("underlineLinks", v)}
            />
            <ToggleRow
              icon={PauseCircle}
              label="Reduzir animações"
              checked={prefs.reduceMotion}
              onChange={(v) => update("reduceMotion", v)}
            />
            <ToggleRow
              icon={BookOpen}
              label="Fonte para dislexia"
              checked={prefs.dyslexiaFont}
              onChange={(v) => update("dyslexiaFont", v)}
            />
            <ToggleRow
              icon={prefs.ttsActive ? VolumeX : Volume2}
              label="Leitura em voz alta"
              checked={prefs.ttsActive}
              onChange={toggleTTS}
            />
            <ToggleRow
              icon={Moon}
              label="Modo escuro"
              checked={prefs.darkMode}
              onChange={(v) => update("darkMode", v)}
            />

            <button
              type="button"
              onClick={reset}
              className="mt-2 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-semibold text-primary hover:bg-secondary/10"
              aria-label="Restaurar configurações padrão de acessibilidade"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Restaurar padrões
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 hover:bg-secondary/5">
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="h-4 w-4" aria-hidden={true} />
        {label}
      </span>
      <span className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          aria-hidden="true"
          className="block h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-secondary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2"
        />
        <span
          aria-hidden="true"
          className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
        />
      </span>
    </label>
  );
}
