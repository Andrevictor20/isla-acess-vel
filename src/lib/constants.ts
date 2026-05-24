export const SITE = {
  name: "Instituto São Luís Acessível",
  shortName: "ISLA",
  slogan: "A Inclusão é Para Todos",
  description:
    "O Instituto São Luís Acessível desenvolve ações e projetos em defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos.",
};

export const CONTACT = {
  address: "São Luís, Maranhão — Brasil",
  addressShort: "São Luís — MA",
  phone: "(98) 0000-0000",
  email: "contato@isla.org.br",
  whatsapp: "5598000000000",
  coords: { lat: -2.5297, lng: -44.3028 },
};

export const SOCIAL = {
  instagram: "https://instagram.com/institutosaoluisacessivel",
  facebook: "#",
  youtube: "#",
  tiktok: "#",
  whatsapp: "#",
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
