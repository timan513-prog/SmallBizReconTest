import React, { useState, useEffect, useMemo } from 'react';
import { Zap, Search, Filter, RefreshCw, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';
import { supabase } from '../lib/supabase';
import type { Post, PostCategory } from '../types/intelBoard';
import PostCard from '../components/intel-board/PostCard';
import AuthModal from '../components/intel-board/AuthModal';
import CategoryBadge from '../components/intel-board/CategoryBadge';
import { useAuth } from '../contexts/AuthContext';

const CATEGORIES: { value: PostCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'policy-update', label: 'Policy Update' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'treasury-intel', label: 'Treasury Intel' },
  { value: 'borrower-guide', label: 'Borrower Guide' },
  { value: 'community', label: 'Community' },
  { value: 'announcement', label: 'Announcement' },
];

const PAGE_SIZE = 10;

const getOrCreateSessionId = (): string => {
  const key = 'sbr_session';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(key, id);
  }
  return id;
};

const IntelBoardPage: React.FC = () => {
  const { isAdmin, isAuthenticated, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<PostCategory | 'all'>('all');
  const [sort, setSort] = useState<'newest' | 'discussed' | 'upvoted'>('newest');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [totalViews, setTotalViews] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'EIDL Intel Board | SmallBiz Recon™';
    const sessionId = getOrCreateSessionId();
    const viewKey = 'sbr_board_viewed';
    if (!sessionStorage.getItem(viewKey)) {
      supabase.from('intel_board_views').insert({ page: 'board', session_id: sessionId });
      sessionStorage.setItem(viewKey, '1');
    }
    supabase.from('intel_board_views').select('id', { count: 'exact', head: true }).then(({ count }) => {
      setTotalViews(count ?? 0);
    });
  }, []);

  const fetchPosts = async (reset = false) => {
    setLoading(true);
    const currentPage = reset ? 0 : page;
    let query = supabase
      .from('posts')
      .select('*, author:profiles(*)')
      .eq('status', 'published');

    if (category !== 'all') query = query.eq('category', category);

    if (sort === 'newest') query = query.order('is_pinned', { ascending: false }).order('published_at', { ascending: false });
    else if (sort === 'discussed') query = query.order('comment_count', { ascending: false });
    else query = query.order('upvote_count', { ascending: false });

    query = query.range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1);

    const { data, error } = await query;
    if (!error && data) {
      if (reset) { setPosts(data as Post[]); setPage(1); }
      else { setPosts(prev => [...prev, ...data as Post[]]); setPage(p => p + 1); }
      setHasMore(data.length === PAGE_SIZE);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(true); }, [category, sort]);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.excerpt ?? '').toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [posts, search]);

  const openAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <EIDLStyleShell
      title="EIDL Intel Board"
      subtitle="Strategy insights, policy analysis, and community discussion from SmallBiz Recon™"
      icon={<Zap size={30} color="#c8a84e" strokeWidth={1.5} />}
    >
      <style>{`
        @keyframes shimmerGold {
          0%,100% { text-shadow: 0 0 8px rgba(200,168,78,0); }
          50% { text-shadow: 0 0 18px rgba(200,168,78,0.35); }
        }
      `}</style>

      {/* Author line */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#c8a84e',
            letterSpacing: '0.06em',
          }}>
            Published by E.T. Harold — 6+ years SBA experience, former Supervisory Team Lead
          </span>
          {isAdmin ? (
            <Link
              to="/intel-board/admin"
              aria-label="Admin Dashboard"
              style={{
                display: 'inline-flex', alignItems: 'center',
                opacity: 0.35, transition: 'opacity 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.35'; }}
            >
              <img
                src="/smallbizrecon_logo_transparent.png"
                alt=""
                style={{ height: 22, width: 'auto', display: 'block' }}
              />
            </Link>
          ) : isAuthenticated ? (
            <button
              onClick={() => signOut()}
              aria-label="Sign out"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer',
                opacity: 0.35, transition: 'opacity 0.2s ease', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.35'; }}
            >
              <img
                src="/smallbizrecon_logo_transparent.png"
                alt=""
                style={{ height: 22, width: 'auto', display: 'block' }}
              />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#5a6450' }}>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => openAuth('login')}
              aria-label="Sign in"
              style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
                opacity: 0.35, transition: 'opacity 0.2s ease', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.35'; }}
            >
              <img
                src="/smallbizrecon_logo_transparent.png"
                alt=""
                style={{ height: 22, width: 'auto', display: 'block' }}
              />
            </button>
          )}
        </div>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,168,78,0.3), transparent)', marginTop: 16 }} />
      </div>

      {/* Filter Bar */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border-primary)',
        borderRadius: 20, padding: '20px 24px', marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <Filter size={16} aria-hidden="true" /> Filter Posts
          </h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Sort:</label>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as typeof sort)}
              style={{
                padding: '7px 12px', borderRadius: 10, background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)', color: 'var(--text-primary)',
                fontSize: 13, fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer',
              }}
            >
              <option value="newest">Newest</option>
              <option value="discussed">Most Discussed</option>
              <option value="upvoted">Most Upvoted</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              style={{
                padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s ease',
                border: category === c.value ? '1px solid var(--border-gold)' : '1px solid var(--border-primary)',
                background: category === c.value ? 'rgba(200,168,78,0.12)' : 'var(--bg-tertiary)',
                color: category === c.value ? 'var(--accent-gold)' : 'var(--text-secondary)',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={15} aria-hidden="true" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts by title, excerpt, or tag..."
            aria-label="Search posts"
            style={{
              width: '100%', paddingLeft: 36, paddingRight: 12, paddingTop: 10, paddingBottom: 10,
              borderRadius: 10, background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.2s ease',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--border-hover)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border-primary)')}
          />
        </div>

        {(category !== 'all' || search) && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)' }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </span>
            <button
              onClick={() => { setCategory('all'); setSearch(''); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, background: 'transparent',
                border: '1px solid var(--border-primary)', borderRadius: 8, color: 'var(--accent-green)',
                fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', padding: '5px 10px',
              }}
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>
        )}
      </div>

      {/* Feed */}
      {loading && posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Loading posts...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '48px 24px', borderRadius: 16,
          background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 10 }}>
            No posts yet
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>
            {category !== 'all' || search ? 'Try adjusting your filters.' : 'Check back soon for new posts from Timothy.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredPosts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              animationDelay={i * 60}
              onRequireAuth={() => openAuth('login')}
            />
          ))}
        </div>
      )}

      {hasMore && !search && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={() => fetchPosts(false)}
            disabled={loading}
            style={{
              padding: '12px 32px', borderRadius: 12, background: 'transparent',
              border: '1px solid var(--border-primary)', color: 'var(--accent-green)',
              fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-body)',
              cursor: loading ? 'wait' : 'pointer', transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-tertiary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            {loading ? 'Loading...' : 'Load More Posts'}
          </button>
        </div>
      )}

      {/* Visitor ticker */}
      {totalViews !== null && (
        <div style={{
          marginTop: 48, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', borderRadius: 100,
            background: 'rgba(154,184,122,0.06)',
            border: '1px solid rgba(154,184,122,0.12)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#9ab87a',
              boxShadow: '0 0 6px rgba(154,184,122,0.6)',
              display: 'inline-block', flexShrink: 0,
            }} />
            <Users size={12} color="#5a6450" />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: '#5a6450', letterSpacing: '0.04em',
            }}>
              {totalViews.toLocaleString()} total visits to this board
            </span>
          </div>
        </div>
      )}

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </EIDLStyleShell>
  );
};

export default IntelBoardPage;
