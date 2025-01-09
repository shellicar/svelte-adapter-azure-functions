import type { Cookie } from '@azure/functions';
import { parse, splitCookiesString } from 'set-cookie-parser';
import type { ClientPrincipal } from './types';

/**
 * Splits 'set-cookie' headers into individual cookies
 */
export const splitCookiesFromHeaders = (headers: Headers): { headers: Record<string, string>; cookies: Cookie[] } => {
  const resHeaders: Record<string, string> = {};
  const resCookies: Cookie[] = [];

  headers.forEach((value, key) => {
    if (key === 'set-cookie') {
      const cookieStrings = splitCookiesString(value);
      resCookies.push(...(parse(cookieStrings) as Cookie[]));
    } else {
      resHeaders[key] = value;
    }
  });

  return { headers: resHeaders, cookies: resCookies };
};

export const getClientIPFromHeaders = (headers: Headers): string => {
  const resHeader = headers.get('x-forwarded-for') ?? '127.0.0.1';
  const [origin] = resHeader.split(', ');
  const [ipAddress] = origin.split(':');
  return ipAddress;
};

/**
 * Gets the client principal from `x-ms-client-principal` header.
 */
export function getClientPrincipalFromHeaders(headers: Headers): ClientPrincipal | undefined {
  // Code adapted from the official SWA documentation
  // https://learn.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript#api-functions
  const header = headers.get('x-ms-client-principal');
  if (!header) {
    return undefined;
  }

  try {
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const clientPrincipal = JSON.parse(decoded);

    return clientPrincipal;
  } catch (e) {
    console.log('Unable to parse client principal:', e);
    return undefined;
  }
}
