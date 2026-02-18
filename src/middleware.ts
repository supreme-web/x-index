import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = new Set(["br", "us", "pt", "uk", "fr", "it", "es"]);
const DEFAULT_COUNTRY = "br";

function getCountryFromHost(hostname: string): string | null {
  // Remove porta se existir (ex: localhost:3001)
  const host = hostname.split(":")[0].toLowerCase();

  // APEX neutro (não reescrever x-index.com nem www.x-index.com)
  const apex = "x-index.com";
  if (host === apex || host === `www.${apex}`) return null;

  const parts = host.split(".");
  if (parts.length < 3) return null;

  const sub = parts[0];

  if (sub === "www") return null;

  return SUPPORTED.has(sub) ? sub : null;
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const detectedCountry = getCountryFromHost(host);

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Ignorar rotas internas/estáticas
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Se já está prefixado (/br, /us, etc.), não reescrever
  const alreadyPrefixed = Array.from(SUPPORTED).some(
    (c) => pathname === `/${c}` || pathname.startsWith(`/${c}/`)
  );
  if (alreadyPrefixed) return NextResponse.next();

  // Se for apex neutro, não reescrever
  if (detectedCountry === null) return NextResponse.next();

  // Subdomínio detectado → reescrever
  const country = detectedCountry ?? DEFAULT_COUNTRY;
  url.pathname = `/${country}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
