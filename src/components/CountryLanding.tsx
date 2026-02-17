type Props = {
  country: "br" | "us" | "pt" | "uk" | "fr" | "it" | "es";
};

const COPY = {
  br: {
    h1: "SEOmniCore Global — x-index",
    p: "Plataforma global de SEO programático e infraestrutura para crescimento orgânico, com páginas geradas por nicho, localidade e intenção de busca.",
    cta1: "Ver estrutura",
    cta2: "Falar com a Supremeweb",
  },
  us: {
    h1: "SEOmniCore Global — x-index",
    p: "Global programmatic SEO platform and infrastructure for organic growth, generating pages by niche, locality, and search intent.",
    cta1: "View structure",
    cta2: "Talk to Supremeweb",
  },
  pt: {
    h1: "SEOmniCore Global — x-index",
    p: "Plataforma global de SEO programático e infraestrutura para crescimento orgânico, com páginas geradas por nicho, localidade e intenção de pesquisa.",
    cta1: "Ver estrutura",
    cta2: "Falar com a Supremeweb",
  },
  uk: {
    h1: "SEOmniCore Global — x-index",
    p: "Global programmatic SEO platform and infrastructure for organic growth, generating pages by niche, locality, and search intent.",
    cta1: "View structure",
    cta2: "Talk to Supremeweb",
  },
  fr: {
    h1: "SEOmniCore Global — x-index",
    p: "Plateforme mondiale de SEO programmatique et infrastructure de croissance organique, générant des pages par niche, localité et intention de recherche.",
    cta1: "Voir la structure",
    cta2: "Parler à Supremeweb",
  },
  it: {
    h1: "SEOmniCore Global — x-index",
    p: "Piattaforma globale di SEO programmatico e infrastruttura per la crescita organica, con pagine generate per nicchia, località e intento di ricerca.",
    cta1: "Vedi struttura",
    cta2: "Parla con Supremeweb",
  },
  es: {
    h1: "SEOmniCore Global — x-index",
    p: "Plataforma global de SEO programático e infraestructura para crecimiento orgánico, generando páginas por nicho, localidad e intención de búsqueda.",
    cta1: "Ver estructura",
    cta2: "Hablar con Supremeweb",
  },
} as const;

export default function CountryLanding({ country }: Props) {
  const t = COPY[country];

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 880, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, border: "1px solid #ddd", display: "grid", placeItems: "center", fontWeight: 700 }}>
            X
          </div>
          <div style={{ fontSize: 14, opacity: 0.75 }}>
            {country.toUpperCase()} · x-index.com
          </div>
        </div>

        <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: "0 0 12px" }}>{t.h1}</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "0 0 22px", opacity: 0.85 }}>{t.p}</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/docs" style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #ddd", textDecoration: "none" }}>
            {t.cta1}
          </a>
          <a href="/contato" style={{ padding: "12px 16px", borderRadius: 12, background: "#111", color: "#fff", textDecoration: "none" }}>
            {t.cta2}
          </a>
        </div>

        <div style={{ marginTop: 26, paddingTop: 18, borderTop: "1px solid #eee", fontSize: 14, opacity: 0.75 }}>
          Instância regional por país via subdomínio · Rotas programáticas por nicho/localidade · SEO técnico (sitemap/robots/metadata)
        </div>
      </div>
    </main>
  );
}
