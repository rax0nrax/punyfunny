import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Define the main domain (for local dev, we might use localhost:3000)
    // In prod, this would be '𓋹.ws' (punycode: xn--158h.ws)
    // We need to handle localhost for testing.
    const currentHost = hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'}`, '');

    // If we are on the root domain (e.g. localhost:3000 or 𓋹.ws), do nothing (let Next.js handle /page.tsx)
    if (
        hostname === 'localhost:3000' ||
        hostname === 'xn--158h.ws' ||
        hostname === 'www.xn--158h.ws' ||
        hostname === 'dawnblack.netlify.app' // Add Netlify domain
    ) {
        // Special case: if we are visiting /dashboard, allow it.
        return NextResponse.next();
    }

    // If we are here, we are likely on a subdomain (e.g. 🚀.localhost:3000 or 🚀.𓋹.ws)
    // The `currentHost` variable should hold the subdomain (e.g. "🚀" or "xn--...")

    // Note: Browsers send Punycode in the Host header.
    // We might need to decode it if we want to work with Unicode internally, 
    // but for routing, we can just pass the raw subdomain to the page and let the page handle it.
    // Actually, let's try to decode it here if possible, or just pass it as is.
    // Since `punycode` is deprecated in node and might not be available in Edge Runtime (Middleware),
    // we will pass the raw subdomain and handle decoding in the page component or API.

    const subdomain = currentHost;

    // Rewrite the URL to our dynamic route handler
    // e.g. 🚀.𓋹.ws/some-path -> /p/🚀/some-path
    url.pathname = `/p/${subdomain}${url.pathname}`;

    return NextResponse.rewrite(url);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
