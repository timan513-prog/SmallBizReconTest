import React from 'react';
import { Link } from 'react-router-dom';
import { Pin, MessageSquare, ArrowRight } from 'lucide-react';
import type { Post } from '../../types/intelBoard';
import CategoryBadge from './CategoryBadge';
import PostVoteControls from './PostVoteControls';

interface Props {
  post: Post;
  animationDelay?: number;
  onRequireAuth: () => void;
}

const PostCard: React.FC<Props> = ({ post, animationDelay = 0, onRequireAuth }) => {
  const excerpt = post.excerpt ?? post.body.slice(0, 180).replace(/[#>*_]/g, '') + '...';
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <article
      style={{
        display: 'flex',
        gap: 20,
        padding: '20px 24px',
        borderRadius: 16,
        background: 'var(--bg-card, rgba(30,34,26,0.6))',
        backdropFilter: 'var(--glass-blur, blur(24px))',
        WebkitBackdropFilter: 'var(--glass-blur, blur(24px))',
        border: post.is_pinned ? '1px solid rgba(200,168,78,0.3)' : '1px solid var(--border-primary, rgba(154,184,122,0.1))',
        borderLeft: post.is_pinned ? '4px solid rgba(200,168,78,0.6)' : undefined,
        transition: 'all 0.3s ease',
        animation: `postFadeIn 0.5s ease ${animationDelay}ms both`,
        boxShadow: 'var(--shadow-card, 0 4px 32px rgba(0,0,0,0.2))',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover, rgba(154,184,122,0.25))';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover, 0 24px 64px rgba(0,0,0,0.35))';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = post.is_pinned ? 'rgba(200,168,78,0.3)' : 'var(--border-primary, rgba(154,184,122,0.1))';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card, 0 4px 32px rgba(0,0,0,0.2))';
      }}
    >
      <PostVoteControls
        postId={post.id}
        upvotes={post.upvote_count}
        downvotes={post.downvote_count}
        onRequireAuth={onRequireAuth}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <CategoryBadge category={post.category} />
          {post.is_pinned && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#c8a84e',
              letterSpacing: '0.08em', fontWeight: 700,
            }}>
              <Pin size={9} aria-hidden="true" /> PINNED
            </span>
          )}
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              padding: '2px 8px', borderRadius: 100, fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
              border: '1px solid rgba(200,168,78,0.2)', color: 'rgba(200,168,78,0.7)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/intel-board/${post.slug}`}
          style={{ textDecoration: 'none' }}
        >
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 600,
            color: 'var(--text-primary, #e8ede2)', marginBottom: 8, lineHeight: 1.35,
            transition: 'color 0.2s ease',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#c8a84e'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary, #e8ede2)'}
          >
            {post.title}
          </h2>
        </Link>

        {post.subtitle && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--text-muted, #5a6450)', marginBottom: 8, fontStyle: 'italic' }}>
            {post.subtitle}
          </p>
        )}

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: 'var(--text-secondary, #8a9480)', lineHeight: 1.7, marginBottom: 14,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted, #5a6450)' }}>
              By Timothy Ellison
            </span>
            {date && (
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted, #5a6450)' }}>
                {date}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted, #5a6450)' }}>
              <MessageSquare size={11} aria-hidden="true" /> {post.comment_count}
            </span>
          </div>
          <Link
            to={`/intel-board/${post.slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: '#c8a84e', textDecoration: 'none', transition: 'gap 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '8px'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '5px'; }}
          >
            Read <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes postFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </article>
  );
};

export default PostCard;
