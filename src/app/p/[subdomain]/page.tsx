'use client';

import { useEffect, useState } from 'react';
import { DB, DomainConfig } from '@/lib/db';
import { downloadVCard } from '@/utils/vcard';
import QRCode from 'react-qr-code';
import {
    User, Briefcase, MapPin, Phone, Mail,
    Share2, Download, Globe, Twitter, Linkedin, Github, Instagram
} from 'lucide-react';

interface Props {
    params: {
        subdomain: string;
    };
}

export default function ProfilePage({ params }: Props) {
    const [config, setConfig] = useState<DomainConfig | null>(null);
    const [showQR, setShowQR] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let sub = decodeURIComponent(params.subdomain);
        // Fallback for client-side navigation where middleware might not have rewritten perfectly or we need to handle raw punycode
        if (sub.startsWith('xn--')) {
            // In a real app we'd decode punycode here if needed
        }

        DB.get(sub).then(res => {
            setConfig(res);
            setLoading(false);
        });
    }, [params.subdomain]);

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-6xl mb-4">{params.subdomain}.𓋹.ws</h1>
                    <p className="text-xl text-gray-500">This domain is available!</p>

                    {/* DEBUG INFO */}
                    <div className="mt-8 p-4 bg-gray-900 rounded text-left text-xs font-mono text-gray-400 inline-block">
                        <p>Raw Param: {params.subdomain}</p>
                        <p>Decoded: {decodeURIComponent(params.subdomain)}</p>
                        <p>DB Keys: {JSON.stringify(Object.keys(DB.getSync ? DB.getSync() : {}))}</p>
                    </div>

                    <div className="mt-4">
                        <a href="/" className="inline-block bg-white text-black px-6 py-2 rounded-full font-bold">
                            Register Now
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Handle REDIRECT
    if (config.type === 'REDIRECT' && config.targetUrl) {
        window.location.href = config.targetUrl;
        return null;
    }

    // Handle BIO
    if (config.type === 'BIO' && config.bioData) {
        const { bioData } = config;

        const themeClasses = {
            dark: 'bg-black text-white',
            light: 'bg-white text-black',
            colorful: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white',
        }[bioData.theme || 'dark'];

        const SocialIcon = ({ platform }: { platform: string }) => {
            switch (platform) {
                case 'twitter': return <Twitter className="w-6 h-6" />;
                case 'linkedin': return <Linkedin className="w-6 h-6" />;
                case 'github': return <Github className="w-6 h-6" />;
                case 'instagram': return <Instagram className="w-6 h-6" />;
                default: return <Globe className="w-6 h-6" />;
            }
        };

        return (
            <div className={`min-h-screen flex flex-col items-center py-12 px-4 relative ${themeClasses}`}>

                {/* Top Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setShowQR(true)}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur transition"
                    >
                        <Share2 className="w-6 h-6" />
                    </button>
                </div>

                {/* Avatar */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 mb-6 shadow-2xl">
                    {bioData.avatarUrl ? (
                        <img src={bioData.avatarUrl} alt={bioData.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-500 flex items-center justify-center text-4xl">
                            {config.subdomain[0]}
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <h1 className="text-3xl font-bold mb-1">{bioData.name || bioData.title}</h1>
                {bioData.jobTitle && (
                    <p className="text-lg opacity-90 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> {bioData.jobTitle}
                        {bioData.company && <span className="opacity-75"> @ {bioData.company}</span>}
                    </p>
                )}
                {bioData.location && (
                    <p className="text-sm opacity-75 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {bioData.location}
                    </p>
                )}

                <p className="text-white/80 mt-4 mb-8 text-center max-w-md leading-relaxed">
                    {bioData.description}
                </p>

                {/* Contact Actions */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => downloadVCard(bioData)}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg"
                    >
                        <Download className="w-5 h-5" /> Save Contact
                    </button>
                    {bioData.email && (
                        <a href={`mailto:${bioData.email}`} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                            <Mail className="w-6 h-6" />
                        </a>
                    )}
                    {bioData.phone && (
                        <a href={`tel:${bioData.phone}`} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
                            <Phone className="w-6 h-6" />
                        </a>
                    )}
                </div>

                {/* Social Grid */}
                {bioData.socials && (
                    <div className="flex gap-6 mb-8">
                        {Object.entries(bioData.socials).map(([platform, url]) => (
                            <a key={platform} href={url} target="_blank" className="hover:text-purple-400 transition transform hover:scale-110">
                                <SocialIcon platform={platform} />
                            </a>
                        ))}
                    </div>
                )}

                {/* Links */}
                <div className="w-full max-w-md space-y-4">
                    {bioData.links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center font-medium transition transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-sm opacity-50">
                    <a href="/">𓋹.ws</a>
                </div>

                {/* QR Modal */}
                {showQR && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
                        <div className="bg-white p-8 rounded-2xl space-y-4 text-center" onClick={e => e.stopPropagation()}>
                            <h3 className="text-black text-xl font-bold">Share Profile</h3>
                            <div className="bg-white p-2 rounded-lg border-2 border-black">
                                <QRCode value={`https://${config.subdomain}.𓋹.ws`} size={200} />
                            </div>
                            <p className="text-black font-mono text-sm">{config.subdomain}.𓋹.ws</p>
                            <button
                                onClick={() => setShowQR(false)}
                                className="text-gray-500 hover:text-black text-sm underline"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

            </div>
        );
    }

    return <div>Unknown configuration</div>;
}
