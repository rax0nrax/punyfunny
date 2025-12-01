import { NextRequest, NextResponse } from 'next/server';
import { isValidPunycodeCombo, toPunycode } from '@/utils/punycode';
import { checkDomainAvailability } from '@/lib/dynadot';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const subdomain = searchParams.get('subdomain');

    if (!subdomain) {
        return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
    }

    // 1. Validate "Punycode Combo" rule
    if (!isValidPunycodeCombo(subdomain)) {
        return NextResponse.json({
            available: false,
            error: 'Invalid format. Strictly emojis or non-ASCII characters only.'
        });
    }

    // 2. Check availability
    const isAvailable = await checkDomainAvailability(subdomain);
    const punycodeVersion = toPunycode(subdomain);

    return NextResponse.json({
        available: isAvailable,
        subdomain: subdomain,
        punycode: punycodeVersion,
        fullDomain: `xn--${punycodeVersion}.xn--158h.ws` // 𓋹.ws is xn--158h.ws
    });
}
