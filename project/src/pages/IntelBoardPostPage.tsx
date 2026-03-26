import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Share2, Eye, MessageSquare, Calendar, Tag, Users } from 'lucide-react';
import EIDLStyleShell from '../components/layout/EIDLStyleShell';
import { supabase } from '../lib/supabase';
import type { Post } from '../types/intelBoard';
import CategoryBadge from '../components/intel-board/CategoryBadge';
import PostVoteControls from '../components/intel-board/PostVoteControls';
import MarkdownRenderer from '../components/intel-board/MarkdownRenderer';
import CommentSection from '../components/intel-board/CommentSection';
import AuthModal from '../components/intel-board/AuthModal';

const IntelBoardPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [postViews, setPostViews] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*, author:profiles(*)')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error || !data) { navigate('/intel-board'); return; }
      setPost(data as Post);
      document.title = `${data.title} | EIDL Intel Board | SmallBiz Recon™`;

      await supabase.from('posts').update({ view_count: (data.view_count ?? 0) + 1 }).eq('id', data.id);

      const sKey = 'sbr_session';
      let sid = sessionStorage.getItem(sKey);
      if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem(sKey, sid); }
      const viewKey = `sbr_post_viewed_${data.id}`;
      if (!sessionStorage.getItem(viewKey)) {
        supabase.from('intel_board_views').insert({ page: data.slug, session_id: sid });
        sessionStorage.setItem(viewKey, '1');
      }
      const { count } = await supabase.from('intel_board_views').select('id', { count: 'exact', head: true }).eq('page', data.slug);
      setPostViews(count ?? 0);

      const { data: older } = await supabase
        .from('posts').select('id,title,slug')
        .eq('status', 'published')
        .lt('published_at', data.published_at)
        .order('published_at', { ascending: false })
        .limit(1).maybeSingle();
      setPrevPost(older as Post | null);

      const { data: newer } = await supabase
        .from('posts').select('id,title,slug')
        .eq('status', 'published')
        .gt('published_at', data.published_at)
        .order('published_at', { ascending: true })
        .limit(1).maybeSingle();
      setNextPost(newer as Post | null);

      setLoading(false);
    };
    fetchPost();
  }, [slug, navigate]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* noop */ }
  };

  const openAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  if (loading) {
    return (
      <EIDLStyleShell title="Loading...">
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Loading post...
        </div>
      </EIDLStyleShell>
    );
  }

  if (!post) return null;

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <EIDLStyleShell title={post.title} subtitle={post.subtitle ?? undefined} maxWidth={900}>
      <article>
        {/* Category + meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <CategoryBadge category={post.category} size="md" />
          {publishedDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-muted)' }}>
              <Calendar size={12} aria-hidden="true" /> {publishedDate}
            </span>
          )}
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-muted)' }}>
            <Eye size={12} aria-hidden="true" /> {post.view_count}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-muted)' }}>
            <MessageSquare size={12} aria-hidden="true" /> {post.comment_count}
          </span>
        </div>

        {/* Engagement strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, padding: '14px 20px', borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}>
          <PostVoteControls
            postId={post.id}
            upvotes={post.upvote_count}
            downvotes={post.downvote_count}
            onRequireAuth={() => openAuth('login')}
          />
          <div style={{ flex: 1, borderLeft: '1px solid var(--border-primary)', paddingLeft: 20 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
              By E.T. Harold · SmallBiz Recon™
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
              Former Supervisory Team Lead · 6+ years SBA experience
            </p>
          </div>
          <button
            onClick={handleShare}
            aria-label="Copy link to post"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10, background: 'transparent',
              border: '1px solid var(--border-primary)', color: 'var(--text-muted)',
              fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <Share2 size={13} aria-hidden="true" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* Cover image */}
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            style={{ width: '100%', borderRadius: 16, marginBottom: 32, border: '1px solid rgba(200,168,78,0.2)', objectFit: 'cover', maxHeight: 400 }}
          />
        )}

        {/* Post body */}
        <div style={{ maxWidth: 720, margin: '0 auto 40px' }}>
          <MarkdownRenderer content={post.body} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32, alignItems: 'center' }}>
            <Tag size={14} color="var(--text-muted)" />
            {post.tags.map(tag => (
              <span key={tag} style={{
                padding: '4px 12px', borderRadius: 100, fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                border: '1px solid rgba(200,168,78,0.25)', color: 'rgba(200,168,78,0.8)',
                background: 'rgba(200,168,78,0.05)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Comment section — before Need Help */}
        <CommentSection post={post} onRequireAuth={openAuth} />

        {/* Visitor ticker */}
        {postViews !== null && (
          <div style={{ marginTop: 24, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(154,184,122,0.06)',
              border: '1px solid rgba(154,184,122,0.12)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#9ab87a', boxShadow: '0 0 6px rgba(154,184,122,0.6)', display: 'inline-block', flexShrink: 0 }} />
              <Users size={11} color="#5a6450" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#5a6450', letterSpacing: '0.04em' }}>
                {postViews.toLocaleString()} {postViews === 1 ? 'visit' : 'visits'} to this post
              </span>
            </div>
          </div>
        )}

        {/* CTA Card */}
        <div style={{
          padding: '28px 32px', borderRadius: 20, marginTop: 40, marginBottom: 40, textAlign: 'center',
          background: 'rgba(154,184,122,0.05)', border: '1px solid rgba(154,184,122,0.15)',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--accent-gold)', marginBottom: 8 }}>
            Need help with your EIDL situation?
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
            Book a free consultation with SmallBiz Recon™.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a
              href="https://calendly.com/smallbizrecon1/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 22px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.18))',
                border: '1px solid rgba(200,168,78,0.4)',
                color: '#e8ede2', fontSize: 13, fontWeight: 700,
                fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Book a Free Call
            </a>
            <Link
              to="/case-evaluator"
              style={{
                padding: '10px 22px', borderRadius: 12, background: 'transparent',
                border: '1px solid var(--border-gold)',
                color: 'var(--accent-gold)', fontSize: 13, fontWeight: 700,
                fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,168,78,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              Evaluate My Case
            </Link>
          </div>
        </div>

        {/* Prev/Next navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
          {prevPost ? (
            <Link
              to={`/intel-board/${prevPost.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                padding: '12px 18px', borderRadius: 12,
                background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
                maxWidth: 280, transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)'; }}
            >
              <ArrowLeft size={16} color="var(--accent-gold)" />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>PREVIOUS</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {prevPost.title}
                </div>
              </div>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link
              to={`/intel-board/${nextPost.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                padding: '12px 18px', borderRadius: 12,
                background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
                maxWidth: 280, textAlign: 'right', transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-primary)'; }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>NEXT</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {nextPost.title}
                </div>
              </div>
              <ArrowRight size={16} color="var(--accent-gold)" />
            </Link>
          ) : <div />}
        </div>
      </article>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab={authTab} />
    </EIDLStyleShell>
  );
};

export default IntelBoardPostPage;
