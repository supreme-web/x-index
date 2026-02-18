import { getCountryFromRequest } from "@/lib/country";
import { Metadata } from "next";

type Props = {
    params: { niche: string; company: string };
};

const SUPPORTED = new Set(["br", "us", "pt", "uk", "fr", "it", "es"]);

const clean = (str: string) => str?.toLowerCase().trim().replace(/-/g, ' ') || '';
const formatTitle = (str: string) => str.replace(/\b\w/g, l => l.toUpperCase());

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { niche, company } = params;
    const country = await getCountryFromRequest();

    const n = clean(niche);
    const c = formatTitle(clean(company));

    const isBr = country === 'br';
    const supportedCountry = SUPPORTED.has(country) ? country : 'br';
    const canonicalUrl = `https://${supportedCountry}.x-index.com/${niche}/${company}`;

    if (isBr) {
        return {
            title: `${formatTitle(n)} em ${supportedCountry.toUpperCase()} — ${c}`,
            description: `Encontre os melhores serviços de ${n} com a ${c}. Atuando em todo o ${supportedCountry.toUpperCase()}.`,
            alternates: { canonical: canonicalUrl },
        };
    }

    return {
        title: `${formatTitle(n)} services in ${supportedCountry.toUpperCase()} by ${c}`,
        description: `Leading ${n} provider ${c} operating in ${supportedCountry.toUpperCase()}. Scale your business with x-index.`,
        alternates: { canonical: canonicalUrl },
    };
}

export default async function ProgrammaticPage({ params }: Props) {
    const { niche, company } = params;
    const country = await getCountryFromRequest();

    const nicheName = clean(niche);
    const companyName = formatTitle(clean(company));
    const isBr = country === 'br';
    const regionName = isBr ? 'Brasil' : country.toUpperCase();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white dark:bg-black text-black dark:text-white">
            <section className="max-w-4xl text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold capitalize leading-tight">
                    {isBr
                        ? `${nicheName} em ${regionName} — ${companyName}`
                        : `${nicheName} in ${regionName} — ${companyName}`
                    }
                </h1>

                <div className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-left space-y-4 inline-block shadow-sm">
                    <h2 className="text-2xl font-semibold mb-2 border-b pb-2 border-zinc-300 dark:border-zinc-700">
                        {isBr ? "Detalhes da Empresa" : "Company Details"}
                    </h2>
                    <p><span className="font-bold text-blue-600">{isBr ? "Empresa:" : "Company:"}</span> {companyName}</p>
                    <p><span className="font-bold text-blue-600">{isBr ? "Serviço:" : "Service:"}</span> {nicheName}</p>
                    <p><span className="font-bold text-blue-600">{isBr ? "Região:" : "Region:"}</span> {regionName}</p>
                </div>

                <div className="pt-12">
                    <a
                        href="https://app.x-index.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:scale-105 inline-block"
                    >
                        {isBr ? "Ativar Minha Empresa" : "Claim My Business"}
                    </a>
                </div>
            </section>
        </main>
    );
}
