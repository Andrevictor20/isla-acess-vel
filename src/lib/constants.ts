export const SITE = {
  name: "Instituto São Luís Acessível",
  shortName: "ISLA",
  slogan: "A Inclusão é Para Todos",
  description:
    "O Instituto São Luís Acessível desenvolve ações e projetos em defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos.",
};

export const CONTACT = {
  address: "Rua Marechal Castelo Branco, N22 — São Luís, MA",
  addressShort: "São Luís — MA",
  phone: "+55 (98) 9884-2455",
  email: "contato@isla.org.br",
  whatsapp: "5598988424 55",
  coords: { lat: -2.5297, lng: -44.3028 },
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/institutosaoluisacessivel",
  facebook: "#",
  youtube: "#",
  tiktok: "#",
  whatsapp: "5598988424 55",
} as const;

export const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Ações", href: "#acoes" },
  { label: "Impacto", href: "#impacto" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Notícias", href: "#noticias" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
] as const;

export const IMPACT_STATS = [
  { value: 1200, suffix: "+", label: "Pessoas Atendidas" },
  { value: 35, suffix: "", label: "Projetos Realizados" },
  { value: 8, suffix: "", label: "Anos de Atuação" },
  { value: 50, suffix: "+", label: "Parcerias Ativas" },
];

export const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/1iWeJsvLaZDr8M1cBO8Th_Vu6LNc3NBChlLzObXh7bww/gviz/tq?tqx=out:json";
