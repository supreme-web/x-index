import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Países suportados pelo projeto Global (por enquanto: 7)
 * Esses são os únicos subdomínios “dinâmicos” permitidos:
 * br.x-index.com, us.x-index.com, pt.x-index.com, uk.x-index.com,
 * fr.x-index.com, it.x-index.com, es.x-index.com
 */
const SUPPORTED_COUNTRIES = new Set(["br", "us", "pt", "uk", "fr", "it", "es"]);
const DEFAULT_COUNTRY = "br";

/**
 * Hosts exatos permitidos (controle total).
 * - apex, www: entrada padrão
 * - app: app interno
 * - api: preparado para quando você realmente usar (não interfere no Next)
 */
const ALLOWED_EXACT_HOSTS = new Set([
  "x-index.com",
  "www.x-index.com",
  "app.x-index.com",
  "api.x-index.com",
]);

/**
 * Normaliza o host:
 * - remove porta (ex: :443)
 * - remove espaços
 * - força lowercase
 */
function normalizeHost(host: string | null): string {
  if (!host) return "";
  return host.split(":")[0].trim().toLowerCase();
}

/**
 * Blindagem suprema (Allowed Hosts):
 * - permite localhost/127.0.0.1 em dev
 * - permite somente hosts exatos listados
 * - permite somente subdomínios de país (7) em *.x-index.com
 * - bloqueia qualquer outro host/subdomínio inesperado (404)
 */
function isAllowedHost(host: string): boolean {
  // Dev local
  if (host === "localhost" || host === "127.0.0.1") return true;

  // Hosts exatos permitidos
  if (ALLOWED_EXACT_HOSTS.has(host)) return true;

  // Subdomínios do x-index: permitir somente se for um país suportado
  if (host.endsWith(".x-index.com")) {
    const sub = host.split(".")[0];
    return SUPPORTED_COUNTRIES.has(sub);
  }

  // Qualquer outro domínio/subdomínio externo é bloqueado
  return false;
}

/**
 * Resolve o país:
 * - <pais>.x-index.com -> pais
 * - demais hosts (apex/www/app/api) -> DEFAULT_COUNTRY
 *
 * Obs: app/api recebem DEFAULT_COUNTRY apenas para manter o header sempre presente.
 * Se no futuro a API não precisar desse header, dá para remover só no host api.
 */
function resolveCountry(host: string): string {
  if (host.endsWith(".x-index.com")) {
    const sub = host.split(".")[0];
    if (SUPPORTED_COUNTRIES.has(sub)) return sub;
  }
  return DEFAULT_COUNTRY;
}

export function middleware(request: NextRequest) {
  const host = normalizeHost(request.headers.get("host"));

  //  Blindagem: host inválido recebe 404 e NÃO vaza conteúdo
  if (!isAllowedHost(host)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ✅ Mantém sua estratégia atual: injeta país no header (sem rewrite)
  const country = resolveCountry(host);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-country", country);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

/**
 * Matcher:
 * - não intercepta assets internos do Next (evita quebrar estáticos)
 * - não intercepta favicon
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
