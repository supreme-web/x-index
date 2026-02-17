import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = new Set(["br", "us", "pt", "uk", "fr", "it", "es"]);
const DEFAULT_COUNTRY = "br";

function getCountryFromHost(hostname: string): string | null {
  // Remove porta se existir (ex.: localhost:3001)
  const host = hostname.split(":")[0].toLowerCase();

  // Ex.: br.x-index.com -> ["br","x-index","com"]
  const parts = host.split(".");
  if (parts.length < 3) return null;

  const sub = parts[0];

  // Ignora www
  if (sub === "www") return null;

  return SUPPORTED.has(sub) ? sub : null;
}

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const country = getCountryFromHost(host) ?? DEFAULT_COUNTRY;

  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Evitar loop em rotas internas/estáticas
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Se já começa com /br, /pt, etc., não reescreve
  const alreadyPrefixed = Array.from(SUPPORTED).some(
    (c) => pathname === `/${c}` || pathname.startsWith(`/${c}/`)
  );
  if (alreadyPrefixed) return NextResponse.next();

  // Reescreve para /{country}{pathname}
  url.pathname = `/${country}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
