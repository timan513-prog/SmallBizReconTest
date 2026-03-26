import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useRealtimeComments } from '../../hooks/useRealtimeComments';
import CommentCard from './CommentCard';
import type { Post } from '../../types/intelBoard';

interface Props {
  post: Post;
  onRequireAuth: (tab?: 'login' | 'signup') => void;
}

const MAX_CHARS = 2000;

const getGuestName = (): string | null => sessionStorage.getItem('sbr_guest_name');
const setGuestName = (name: string) => sessionStorage.setItem('sbr_guest_name', name);

const CommentSection: React.FC<Props> = ({ post, onRequireAuth }) => {
  const { comments, loading, hasMore, loadMore } = useRealtimeComments(post.id);
  const [body, setBody] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sort, setSort] = useState<'newest' | 'top'>('newest');
  const [submitted, setSubmitted] = useState(false);

  const [guestName, setGuestNameState] = useState<string>(getGuestName() ?? '');
  const [nameEntered, setNameEntered] = useState(!!getGuestName());
  const [nameInput, setNameInput] = useState('');

  const sortedComments = [...comments].sort((a, b) => {
    if (sort === 'top') return (b.upvote_count - b.downvote_count) - (a.upvote_count - a.downvote_count);
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setGuestName(trimmed);
    setGuestNameState(trimmed);
    setNameEntered(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim() || !guestName) return;
    setSubmitting(true);
    try {
      await supabase.from('comments').insert({
        post_id: post.id,
        author_id: null,
        parent_id: replyTo?.id ?? null,
        body: body.trim(),
        is_anonymous: true,
        anonymous_display_name: guestName,
        status: 'pending',
      });
      setBody('');
      setReplyTo(null);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-label="Comment section" style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 26, fontWeight: 400, color: 'var(--text-primary, #e8ede2)',
          display: 'flex', alignItems: 'center', gap: 10, margin: 0,
        }}>
          <MessageSquare size={22} aria-hidden="true" style={{ color: '#c8a84e' }} />
          Discussion
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--text-muted, #5a6450)', fontWeight: 400 }}>
            ({post.comment_count})
          </span>
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['newest', 'top'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                color: sort === s ? '#c8a84e' : 'var(--text-muted, #5a6450)',
                textDecoration: sort === s ? 'underline' : 'none', textUnderlineOffset: 3,
                padding: 0,
              }}
            >
              {s === 'newest' ? 'Newest' : 'Top'}
            </button>
          ))}
        </div>
      </div>

      {/* Name entry (first time) */}
      {!nameEntered ? (
        <div style={{
          padding: '24px 28px', borderRadius: 16, marginBottom: 28,
          background: 'var(--bg-card, rgba(30,34,26,0.6))',
          border: '1px solid var(--border-primary, rgba(154,184,122,0.1))',
          textAlign: 'center',
        }}>
          <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontWeight: 400, color: 'var(--text-primary, #e8ede2)', marginBottom: 6 }}>
            Join the Discussion
          </h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary, #8a9480)', marginBottom: 20 }}>
            Enter a display name to leave a comment. All comments are reviewed before appearing.
          </p>
          <form onSubmit={handleNameSubmit} style={{ display: 'flex', gap: 10, maxWidth: 360, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder="Your display name"
              maxLength={60}
              required
              autoFocus
              style={{
                flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 10,
                background: 'rgba(38,44,32,0.5)', border: '1px solid rgba(154,184,122,0.15)',
                color: 'var(--text-primary, #e8ede2)', fontSize: 14,
                fontFamily: "'DM Sans', sans-serif", outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.15)')}
            />
            <button
              type="submit"
              disabled={!nameInput.trim()}
              style={{
                padding: '10px 22px', borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.18))',
                border: '1px solid rgba(200,168,78,0.4)',
                color: '#e8ede2', fontSize: 13, fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: nameInput.trim() ? 'pointer' : 'not-allowed',
                opacity: nameInput.trim() ? 1 : 0.6,
              }}
            >
              Continue
            </button>
          </form>
        </div>
      ) : (
        /* Composer */
        <div style={{
          padding: '20px 24px', borderRadius: 16, marginBottom: 28,
          background: 'var(--bg-card, rgba(30,34,26,0.6))',
          border: '1px solid var(--border-primary, rgba(154,184,122,0.1))',
        }}>
          {submitted ? (
            <div style={{
              padding: '14px 18px', borderRadius: 10, textAlign: 'center',
              background: 'rgba(154,184,122,0.08)', border: '1px solid rgba(154,184,122,0.2)',
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#9ab87a',
            }}>
              Your comment has been submitted and is pending review. Thank you!
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#c8a84e' }}>
                    {guestName[0]?.toUpperCase() ?? 'G'}
                  </span>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text-secondary, #8a9480)' }}>
                  {guestName}
                </span>
                <button
                  onClick={() => { setNameEntered(false); setGuestNameState(''); setNameInput(''); sessionStorage.removeItem('sbr_guest_name'); }}
                  style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #5a6450)', fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
                >
                  change
                </button>
                {replyTo && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c8a84e' }}>
                    Replying to @{replyTo.author}
                    <button
                      onClick={() => setReplyTo(null)}
                      style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #5a6450)', fontSize: 11 }}
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value.slice(0, MAX_CHARS))}
                    placeholder="Share your thoughts..."
                    rows={4}
                    aria-label="Comment body"
                    aria-describedby="char-count"
                    style={{
                      width: '100%', padding: '12px 14px', borderRadius: 10,
                      background: 'rgba(38,44,32,0.5)', border: '1px solid rgba(154,184,122,0.15)',
                      color: 'var(--text-primary, #e8ede2)', fontSize: 14,
                      fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'vertical',
                      transition: 'border-color 0.2s ease', lineHeight: 1.6,
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(154,184,122,0.15)')}
                  />
                  <span
                    id="char-count"
                    aria-live="polite"
                    style={{
                      position: 'absolute', bottom: 10, right: 12,
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                      color: body.length > MAX_CHARS * 0.9 ? '#cc6666' : 'var(--text-muted, #5a6450)',
                    }}
                  >
                    {MAX_CHARS - body.length}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted, #5a6450)' }}>
                    Comments are reviewed before posting
                  </span>
                  <button
                    type="submit"
                    disabled={submitting || !body.trim()}
                    style={{
                      padding: '10px 22px', borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(200,168,78,0.35), rgba(200,168,78,0.18))',
                      border: '1px solid rgba(200,168,78,0.4)',
                      color: '#e8ede2', fontSize: 13, fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif", cursor: submitting || !body.trim() ? 'not-allowed' : 'pointer',
                      opacity: submitting || !body.trim() ? 0.6 : 1, transition: 'all 0.2s ease',
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Submit for Review'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted, #5a6450)', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
          Loading comments...
        </div>
      ) : sortedComments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted, #5a6450)', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
          No comments yet. Be the first to share your thoughts.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sortedComments.map(comment => (
            <CommentCard
              key={comment.id}
              comment={comment}
              depth={0}
              onRequireAuth={() => {}}
              onReply={(id, author) => setReplyTo({ id, author })}
              onDeleted={() => {}}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button
            onClick={loadMore}
            style={{
              padding: '10px 28px', borderRadius: 12,
              background: 'transparent', border: '1px solid var(--border-primary, rgba(154,184,122,0.1))',
              color: 'var(--accent-green, #9ab87a)', fontSize: 13, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover, rgba(154,184,122,0.25))'; e.currentTarget.style.background = 'var(--bg-tertiary, rgba(38,44,32,0.5))'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary, rgba(154,184,122,0.1))'; e.currentTarget.style.background = 'transparent'; }}
          >
            Load more comments
          </button>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
