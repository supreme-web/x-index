import { getCountryFromRequest } from "@/lib/country";

export default async function Home() {
  const country = await getCountryFromRequest();
  const isBr = country === "br";

  const content = isBr
    ? {
      title: "x-index: Domine Seu Nicho Local",
      subtitle:
        "A plataforma definitiva para escalar sua presença orgânica em múltiplos bairros e cidades.",
      cta: "Acessar Painel",
    }
    : {
      title: "x-index: Dominate Your Local Niche",
      subtitle:
        "The ultimate platform to scale your organic presence across multiple neighborhoods and cities.",
      cta: "Access Dashboard",
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-center text-white">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent pb-2">
          {content.title}
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-zinc-400 leading-relaxed">
          {content.subtitle}
        </p>

        <div className="pt-8">
          <a
            href="https://app.x-index.com"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {content.cta}
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div className="mt-16 text-xs text-zinc-600">
          <p>Region: {country.toUpperCase()}</p>
        </div>
      </div>
    </main>
  );
}
