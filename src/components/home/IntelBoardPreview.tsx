import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pin, MessageSquare, ArrowRight, Zap, ChevronUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Post } from '../../types/intelBoard';
import CategoryBadge from '../intel-board/CategoryBadge';

const IntelBoardPreview: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setPosts((data ?? []) as Post[]);
        setLoading(false);
      });
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section style={{ padding: '72px 24px', background: 'linear-gradient(180deg, rgba(24,28,20,0.98) 0%, rgba(20,24,16,1) 100%)' }}>
      <style>{`
        @keyframes previewFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerGoldText {
          0%,100% { text-shadow: 0 0 0 rgba(200,168,78,0); }
          50% { text-shadow: 0 0 20px rgba(200,168,78,0.3); }
        }
      `}</style>

      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 48, animation: 'previewFadeUp 0.6s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '5px 14px', borderRadius: 100, background: 'rgba(200,168,78,0.08)', border: '1px solid rgba(200,168,78,0.2)' }}>
            <Zap size={13} color="#c8a84e" aria-hidden="true" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: '#c8a84e', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              By Timothy Ellison
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 42, fontWeight: 400,
            color: '#e8ede2',
            marginBottom: 12, lineHeight: 1.1, letterSpacing: '-0.02em',
            animation: 'shimmerGoldText 4s ease-in-out infinite',
          }}>
            EIDL Intel Board
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: 'rgba(138,148,128,0.9)', lineHeight: 1.7,
            maxWidth: 580, margin: '0 auto',
          }}>
            Expert insights, strategy breakdowns, and community discussion for COVID EIDL borrowers.
          </p>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,168,78,0.3), transparent)', marginTop: 24, maxWidth: 400, margin: '24px auto 0' }} />
        </div>

        {/* Post Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>
          {posts.map((post, i) => {
            const date = post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '';
            const excerpt = post.excerpt ?? post.body.replace(/[#>*_]/g, '').slice(0, 160) + '...';

            return (
              <Link
                key={post.id}
                to={`/intel-board/${post.slug}`}
                style={{ textDecoration: 'none', display: 'block', animation: `previewFadeUp 0.6s ease ${i * 100 + 200}ms both` }}
              >
                <div
                  style={{
                    height: '100%',
                    padding: '22px 24px',
                    borderRadius: 16,
                    background: 'rgba(30,34,26,0.6)',
                    backdropFilter: 'blur(24px)',
                    border: post.is_pinned ? '1px solid rgba(200,168,78,0.25)' : '1px solid rgba(154,184,122,0.1)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    boxShadow: '0 4px 32px rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,78,0.4)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = post.is_pinned ? 'rgba(200,168,78,0.25)' : 'rgba(154,184,122,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(0,0,0,0.2)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CategoryBadge category={post.category} />
                    {post.is_pinned && (
                      <Pin size={12} color="#c8a84e" aria-label="Pinned" />
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 600,
                    color: '#e8ede2', lineHeight: 1.35, margin: 0,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {post.title}
                  </h3>

                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: 'rgba(138,148,128,0.85)', lineHeight: 1.65, margin: 0, flex: 1,
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid rgba(154,184,122,0.08)' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#5a6450' }}>
                        {date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#5a6450' }}>
                        <MessageSquare size={10} /> {post.comment_count}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#5a6450' }}>
                        <ChevronUp size={10} /> {post.upvote_count - post.downvote_count}
                      </span>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: '#c8a84e' }}>
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/intel-board"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
              color: '#c8a84e', textDecoration: 'none', transition: 'gap 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '12px'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '8px'; }}
          >
            View All Posts <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntelBoardPreview;
