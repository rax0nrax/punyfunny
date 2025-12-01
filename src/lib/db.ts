
export type DomainType = 'REDIRECT' | 'BIO';

export interface BioLink {
    title: string;
    url: string;
    icon?: string;
}

export interface BioData {
    title: string;
    description: string;
    avatarUrl?: string;
    theme: 'dark' | 'light' | 'colorful';
    links: BioLink[];
    // New Business Card Fields
    name?: string;
    jobTitle?: string;
    company?: string;
    location?: string;
    phone?: string;
    email?: string;
    socials?: {
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        github?: string;
        website?: string;
        [key: string]: string | undefined;
    };
}

export interface DomainConfig {
    subdomain: string;
    type: DomainType;
    targetUrl?: string;
    bioData?: BioData;
    ownerId: string;
}

// Mock In-Memory Database
const db: Record<string, DomainConfig> = {
    '🚀': {
        subdomain: '🚀',
        type: 'BIO',
        ownerId: 'user_1',
        bioData: {
            title: 'Rocket Man',
            description: 'To the moon and beyond! 🌑',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rocket',
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
            links: [
                { title: 'My Website', url: 'https://example.com' },
                { title: 'Launch Schedule', url: 'https://nasa.gov' },
            ]
        }
    },
    'cool': {
        subdomain: 'cool',
        type: 'REDIRECT',
        ownerId: 'user_2',
        targetUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
};

export const DB = {
    get: async (subdomain: string) => {
        // Simulate DB delay
        await new Promise(resolve => setTimeout(resolve, 50));
        return db[subdomain] || null;
    },
    getSync: () => db,
    set: async (config: DomainConfig) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        db[config.subdomain] = config;
        return config;
    }
};
