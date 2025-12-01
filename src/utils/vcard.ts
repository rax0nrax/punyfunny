import { BioData } from '@/lib/db';

export function generateVCard(data: BioData): string {
    const parts = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.name || data.title}`,
        data.jobTitle ? `TITLE:${data.jobTitle}` : '',
        data.company ? `ORG:${data.company}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.phone ? `TEL:${data.phone}` : '',
        data.location ? `ADR:;;${data.location};;;;` : '',
        data.socials?.website ? `URL:${data.socials.website}` : '',
        `NOTE:${data.description}`,
        'END:VCARD'
    ];

    return parts.filter(Boolean).join('\n');
}

export function downloadVCard(data: BioData) {
    const vcard = generateVCard(data);
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name || 'contact'}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
