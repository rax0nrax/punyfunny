import { toASCII, toUnicode as punycodeToUnicode } from 'punycode';

/**
 * Converts a Unicode string to Punycode.
 */
export function toPunycode(input: string): string {
    return toASCII(input);
}

/**
 * Converts a Punycode string to Unicode.
 */
export function toUnicode(input: string): string {
    return punycodeToUnicode(input);
}

/**
 * Validates if the input string is a valid "Punycode Combo".
 * Rule: Must contain ONLY emojis or non-ASCII characters.
 * No mixed Latin/ASCII allowed (except for the punycode prefix 'xn--' internally, but we check the decoded form).
 */
export function isValidPunycodeCombo(input: string): boolean {
    if (!input) return false;

    // 1. Decode first to ensure we are checking the visual representation
    const decoded = input.startsWith('xn--') ? punycodeToUnicode(input) : input;

    // 2. Check for any ASCII alphanumeric characters (a-z, 0-9)
    // We want to FORBID them.
    // Regex: /[a-z0-9]/i matches any ASCII letter or number.
    const hasAscii = /[a-z0-9]/i.test(decoded);

    // 3. Ensure it has at least one non-ASCII character (to be a "punycode" domain)
    // Actually, if we forbid ASCII, and it's not empty, it must be non-ASCII (or symbols).
    // But we want to allow "pure" emoji/unicode.

    return !hasAscii;
}

/**
 * Formats the full domain name.
 * e.g. "🚀" -> "xn--158h.𓋹.ws" (visual: "🚀.𓋹.ws")
 */
export function formatFullDomain(subdomain: string): string {
    const punySub = toPunycode(subdomain);
    const base = "𓋹.ws"; // Already unicode
    // If we want the full punycode version:
    // const basePuny = "xn--... .ws";
    // But usually we display unicode.
    return `${punySub}.${base}`;
}
