export const SITE = {
  name: 'Instituto São Luís Acessível',
  shortName: 'ISLA',
  slogan: 'A Inclusão é Para Todos',
  description:
    'O Instituto São Luís Acessível desenvolve ações e projetos em defesa dos direitos de pessoas com deficiência, mobilidade reduzida e idosos.',
  url: 'https://isla-acessivel.org.br',
  locale: 'pt_BR',
  lang: 'pt-BR',
  founded: 2018,
  gaId: 'G-MG23VD9TXE',
  googleSiteVerification: '00AfLOFTXqVFWthfg_1dTybfZa-waeXFXVHYV0fB3tE',
} as const;

export const CONTACT = {
  address: 'Rua Marechal Castelo Branco, N22 — São Luís, MA',
  addressShort: 'São Luís — MA',
  phone: '98 8884-2455',
  email: 'contato@isla.org.br',
  whatsapp: '+5598888424555',
  coords: { lat: -2.5297, lng: -44.3028 },
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/institutosaoluisacessivel',
  facebook: '#',
  youtube: '#',
  tiktok: '#',
  whatsapp: '+5598888424555',
} as const;

export const NAV_LINKS = [
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Ações', href: '/#acoes' },
  { label: 'Impacto', href: '/#impacto' },
  { label: 'Depoimentos', href: '/#depoimentos' },
  { label: 'Notícias', href: '/blog' },
  { label: 'Localização', href: '/#localizacao' },
  { label: 'Contato', href: '/#contato' },
] as const;

export const NAV_LINKS_HOME = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Ações', href: '#acoes' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Notícias', href: '/blog' },
  { label: 'Localização', href: '#localizacao' },
  { label: 'Contato', href: '#contato' },
] as const;

// Fallback stats — overridden by Sanity siteSettings when available
export const IMPACT_STATS = [
  { value: 1200, suffix: '+', label: 'Pessoas Atendidas' },
  { value: 35, suffix: '', label: 'Projetos Realizados' },
  { value: 8, suffix: '', label: 'Anos de Atuação' },
  { value: 50, suffix: '+', label: 'Parcerias Ativas' },
] as const;

// Fallback testimonials — overridden by Sanity siteSettings when available
export const TESTIMONIALS = [
  {
    name: 'Maria das Graças',
    role: 'Mãe de aluno atendido',
    initials: 'MG',
    text: 'O ISLA mudou a vida da minha família. Hoje meu filho frequenta a escola com dignidade e acolhimento.',
  },
  {
    name: 'João Pereira',
    role: 'Pessoa com deficiência',
    initials: 'JP',
    text: 'Pela primeira vez senti que minha voz importava. O instituto me ajudou a conhecer e exigir meus direitos.',
  },
  {
    name: 'Dona Antônia',
    role: 'Idosa atendida',
    initials: 'DA',
    text: 'Aqui encontrei companhia, respeito e cuidado. Recomendo o trabalho do ISLA de olhos fechados.',
  },
] as const;

// Fallback partners
export const PARTNERS = [
  'Prefeitura de São Luís',
  'Governo do Estado do Maranhão',
  'OAB Maranhão',
  'UFMA',
  'SEBRAE MA',
] as const;

export const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps?q=ISLA+Instituto+S%C3%A3o+Lu%C3%ADs+Acess%C3%ADvel+Rua+Marechal+Castelo+Branco+22+S%C3%A3o+Lu%C3%ADs+MA&output=embed';

export const SHEETS_URL =
  'https://docs.google.com/spreadsheets/d/1iWeJsvLaZDr8M1cBO8Th_Vu6LNc3NBChlLzObXh7bww/gviz/tq?tqx=out:json';
