import { headers } from 'next/headers';

export const DEFAULT_COUNTRY = 'br';

export async function getCountryFromRequest(): Promise<string> {
    const headersList = await headers();
    const countryHeader = headersList.get('x-country');

    if (!countryHeader) {
        return DEFAULT_COUNTRY;
    }

    return countryHeader.trim().toLowerCase() || DEFAULT_COUNTRY;
}
