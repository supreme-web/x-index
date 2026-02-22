import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Países suportados pelo projeto Global
const SUPPORTED_COUNTRIES = new Set(['br', 'us', 'pt', 'uk', 'fr', 'it', 'es']);
const DEFAULT_COUNTRY = 'br';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || "";

  // Extrai o primeiro segmento do host (subdomínio ou o próprio domínio se for apex)
  // Ex: br.x-index.com -> "br"
  // Ex: www.x-index.com -> "www"
  // Ex: x-index.com -> "x-index"
  // Ex: localhost:3000 -> "localhost"
  const subdomain = hostname.split('.')[0].toLowerCase();

  // Lógica de detecção:
  // Se o subdomínio for um país suportado, usa ele.
  // Caso contrário (www, apex, localhost puro etc), usa o DEFAULT_COUNTRY.
  const country = SUPPORTED_COUNTRIES.has(subdomain) ? subdomain : DEFAULT_COUNTRY;

  // Clona os headers da requisição original para injetar o x-country
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-country', country);

  // Retorna o request modificado, sem rewrite de URL, apenas passando o header adiante.
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // Mantém a regra de ignorar next internals e estáticos
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
