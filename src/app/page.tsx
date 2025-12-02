'use client';

import { useState } from 'react';
import { Search, Check, X, Loader2 } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const checkAvailability = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/check-availability?subdomain=${encodeURIComponent(input)}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 font-sans">
      <div className="z-10 max-w-2xl w-full text-center space-y-8">

        {/* Hero */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
          𓋹.ws
        </h1>
        <p className="text-xl text-gray-400">
          The exclusive registry for Emoji & Punycode domains.
        </p>

        {/* Search Box */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-800 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type an emoji (e.g. 🚀)"
              className="flex-1 bg-transparent text-2xl p-4 outline-none placeholder-gray-600"
              onKeyDown={(e) => e.key === 'Enter' && checkAvailability()}
            />
            <button
              onClick={checkAvailability}
              disabled={loading}
              className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 p-6 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
            {result.error ? (
              <div className="flex items-center justify-center space-x-2 text-red-500">
                <X className="w-6 h-6" />
                <span className="text-lg font-medium">{result.error}</span>
              </div>
            ) : result.available ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-500">
                  <Check className="w-6 h-6" />
                  <span className="text-2xl font-bold">{input}.𓋹.ws is available!</span>
                </div>
                <div className="text-sm text-gray-500 font-mono">
                  {result.fullDomain}
                </div>
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await fetch('/api/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ subdomain: input })
                      });
                      const data = await res.json();
                      if (data.error) {
                        alert('Checkout Error: ' + data.error);
                      } else if (data.url) {
                        window.location.href = data.url;
                      }
                    } catch (e) {
                      console.error(e);
                      alert('Checkout failed');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl transition transform hover:scale-[1.02]"
                >
                  Register for $20
                </button>
              </div>
            ) : (
              <div className="text-yellow-500">
                <span className="text-lg font-bold">Taken / Unavailable</span>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-600 text-sm">
        Powered by Dynadot & Stripe
      </div>
    </main>
  );
}
