import { useState, useEffect, useCallback } from 'react';
import { Rss, ExternalLink, Calendar, Tag, RefreshCw, CircleAlert as AlertCircle, Globe } from 'lucide-react';
import { NewsItem } from '../types/news';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const CATEGORY_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  'Disaster Fraud':   { bg: 'rgba(200,80,80,0.08)',    border: 'rgba(200,80,80,0.18)',    text: '#cc6666' },
  'EIDL':             { bg: 'rgba(100,140,200,0.08)',  border: 'rgba(100,140,200,0.18)',  text: '#6a9bd4' },
  'Disaster Relief':  { bg: 'rgba(200,80,80,0.08)',    border: 'rgba(200,80,80,0.18)',    text: '#cc6666' },
  'Policy & Fraud':   { bg: 'rgba(200,140,60,0.08)',   border: 'rgba(200,140,60,0.18)',   text: '#c8933c' },
  'Policy Update':    { bg: 'rgba(200,168,78,0.08)',   border: 'rgba(200,168,78,0.18)',   text: '#cda349' },
  'SBA News & Updates': { bg: 'rgba(154,184,122,0.08)', border: 'rgba(154,184,122,0.18)', text: '#9ab87a' },
};

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? { bg: 'var(--bg-tertiary)', border: 'var(--border-primary)', text: 'var(--text-secondary)' };
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

const AutoNewsSection = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/sba-news-feed`, {
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setItems(data.items ?? []);
      setLastFetched(data.lastFetched ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load live news');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'rgba(200,168,78,0.1)',
            border: '1px solid rgba(200,168,78,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Rss size={18} color="#cda349" />
          </div>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 400,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}>
              Live from SBA.gov
            </h2>
            {lastFetched && (
              <p style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                marginTop: 2,
              }}>
                Updated {formatDate(lastFetched)}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={fetchNews}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            background: 'transparent',
            border: '1px solid var(--border-primary)',
            borderRadius: 10,
            color: 'var(--text-secondary)',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)'; }}
        >
          <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              height: 96,
              borderRadius: 14,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                animation: 'shimmer 1.5s infinite',
              }} />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div style={{
          padding: '20px 24px',
          borderRadius: 14,
          background: 'rgba(200,80,80,0.06)',
          border: '1px solid rgba(200,80,80,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <AlertCircle size={18} color="#cc6666" />
          <div>
            <p style={{ fontSize: 14, color: '#cc6666', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              Could not load live feed
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
              {error}
            </p>
          </div>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={{
          padding: '24px',
          borderRadius: 14,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            No live items found at this time.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item) => {
            const cat = getCategoryStyle(item.category);
            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '18px 20px',
                  borderRadius: 14,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                  e.currentTarget.style.background = 'var(--bg-card-hover, var(--bg-tertiary))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.background = 'var(--bg-card)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '3px 10px',
                    borderRadius: 6,
                    background: cat.bg,
                    border: `1px solid ${cat.border}`,
                  }}>
                    <Tag size={11} style={{ color: cat.text }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: cat.text, fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>
                      {item.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Calendar size={11} color="var(--text-muted)" />
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                      {formatDate(item.pubDate)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
                    <ExternalLink size={11} color="var(--text-muted)" />
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                  marginBottom: 6,
                  letterSpacing: '-0.01em',
                }}>
                  {item.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Globe size={11} color="var(--text-muted)" />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                    {item.source}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default AutoNewsSection;
