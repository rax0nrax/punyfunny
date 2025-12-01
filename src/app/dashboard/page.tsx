'use client';

import { useState, useEffect } from 'react';
import { Loader2, Save, Layout, Link as LinkIcon } from 'lucide-react';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'BIO' | 'REDIRECT'>('BIO');

    // Simulate loading user data
    useEffect(() => {
        // Hardcoded for demo: managing '🚀'
        // In a real app, we would fetch this from the DB
        setConfig({
            subdomain: '🚀',
            type: 'BIO',
            targetUrl: '',
            bioData: {
                title: 'Rocket Man',
                description: 'To the moon! 🌑',
                theme: 'colorful',
                name: 'Elon Musk (Parody)',
                jobTitle: 'Chief Rocket Officer',
                company: 'SpaceX',
                location: 'Mars Colony 1',
                email: 'elon@mars.com',
                phone: '+1-555-MARS-001',
                socials: {
                    twitter: 'https://twitter.com/elonmusk',
                    website: 'https://spacex.com'
                },
                links: [{ title: 'Website', url: 'https://example.com' }]
            }
        });
        setActiveTab('BIO');
    }, []);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Saved! (Mock)');
        }, 1000);
    };

    if (!config) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 p-6 hidden md:block">
                <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    𓋹 Dashboard
                </h1>
                <nav className="space-y-2">
                    <button className="w-full text-left px-4 py-2 rounded bg-gray-900 text-white font-medium">
                        My Domains
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-900 text-gray-400 transition">
                        Billing
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-900 text-gray-400 transition">
                        Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            {config.subdomain}.𓋹.ws
                        </h2>
                        <p className="text-gray-500">Manage your emoji domain</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </header>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-800 pb-4">
                    <button
                        onClick={() => setActiveTab('BIO')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'BIO' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Layout className="w-4 h-4" /> Link in Bio
                    </button>
                    <button
                        onClick={() => setActiveTab('REDIRECT')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'REDIRECT' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <LinkIcon className="w-4 h-4" /> Redirect
                    </button>
                </div>

                {/* Content Area */}
                <div className="max-w-2xl pb-20">
                    {activeTab === 'BIO' ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">

                            {/* Personal Info */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Personal Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Full Name</label>
                                        <input
                                            type="text"
                                            value={config.bioData.name || ''}
                                            onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, name: e.target.value } })}
                                            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Job Title</label>
                                        <input
                                            type="text"
                                            value={config.bioData.jobTitle || ''}
                                            onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, jobTitle: e.target.value } })}
                                            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Company</label>
                                        <input
                                            type="text"
                                            value={config.bioData.company || ''}
                                            onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, company: e.target.value } })}
                                            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Location</label>
                                        <input
                                            type="text"
                                            value={config.bioData.location || ''}
                                            onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, location: e.target.value } })}
                                            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Contact Info */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Email</label>
                                        <input
                                            type="email"
                                            value={config.bioData.email || ''}
                                            onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, email: e.target.value } })}
                                            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Phone</label>
                                        <input
                                            type="tel"
                                            value={config.bioData.phone || ''}
                                            onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, phone: e.target.value } })}
                                            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Page Content */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Page Content</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Page Title</label>
                                    <input
                                        type="text"
                                        value={config.bioData.title}
                                        onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, title: e.target.value } })}
                                        className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Bio Description</label>
                                    <textarea
                                        value={config.bioData.description}
                                        onChange={(e) => setConfig({ ...config, bioData: { ...config.bioData, description: e.target.value } })}
                                        className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none h-24"
                                    />
                                </div>
                            </section>

                            {/* Theme */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Theme</label>
                                <div className="flex gap-4">
                                    {['dark', 'light', 'colorful'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setConfig({ ...config, bioData: { ...config.bioData, theme: t } })}
                                            className={`px-4 py-2 rounded border ${config.bioData.theme === t ? 'border-purple-500 bg-purple-500/20 text-purple-400' : 'border-gray-800 text-gray-500'}`}
                                        >
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200 text-sm">
                                Visitors to <strong>{config.subdomain}.𓋹.ws</strong> will be immediately redirected.
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Destination URL</label>
                                <input
                                    type="url"
                                    placeholder="https://"
                                    value={config.targetUrl}
                                    onChange={(e) => setConfig({ ...config, targetUrl: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
