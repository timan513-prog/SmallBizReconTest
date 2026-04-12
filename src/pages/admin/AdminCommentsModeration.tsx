import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck as CheckCircle, Trash2, ShieldAlert } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Comment } from '../../types/intelBoard';

interface CommentWithPost extends Comment {
  post?: { title: string; slug: string };
}

const AdminCommentsModeration: React.FC = () => {
  const [tab, setTab] = useState<'pending' | 'flagged' | 'all'>('pending');
  const [comments, setComments] = useState<CommentWithPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchComments = async () => {
    setLoading(true);
    let query = supabase
      .from('comments')
      .select('*, author:profiles(display_name, role), post:posts(title, slug)')
      .order('created_at', { ascending: false });
    if (tab === 'pending') query = query.eq('status', 'pending');
    else if (tab === 'flagged') query = query.eq('status', 'flagged');
    const { data } = await query;
    setComments((data ?? []) as CommentWithPost[]);
    setLoading(false);
  };

  const fetchPendingCount = async () => {
    const { count } = await supabase.from('comments').select('id', { count: 'exact', head: true }).eq('status', 'pending');
    setPendingCount(count ?? 0);
  };

  useEffect(() => { fetchComments(); fetchPendingCount(); }, [tab]);

  const approve = async (id: string) => {
    await supabase.from('comments').update({ status: 'visible', flag_reason: null }).eq('id', id);
    fetchComments();
    fetchPendingCount();
  };

  const remove = async (id: string) => {
    await supabase.from('comments').update({ status: 'removed' }).eq('id', id);
    fetchComments();
    fetchPendingCount();
  };

  const ban = async (authorId: string | null) => {
    if (!authorId) return;
    if (!confirm('Ban this user?')) return;
    await supabase.from('profiles').update({ is_banned: true }).eq('id', authorId);
    fetchComments();
  };

  const TABS: { value: 'pending' | 'flagged' | 'all'; label: string }[] = [
    { value: 'pending', label: `Pending Review${pendingCount > 0 ? ` (${pendingCount})` : ''}` },
    { value: 'flagged', label: 'Flagged' },
    { value: 'all', label: 'All Comments' },
  ];

  const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending: { bg: 'rgba(200,168,78,0.12)', color: '#c8a84e' },
    flagged: { bg: 'rgba(200,80,80,0.15)', color: '#cc6666' },
    visible: { bg: 'rgba(154,184,122,0.12)', color: '#9ab87a' },
    removed: { bg: 'rgba(90,100,80,0.2)', color: '#5a6450' },
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: '#e8ede2', marginBottom: 8 }}>
        Comment Moderation
      </h2>
      {pendingCount > 0 && (
        <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(200,168,78,0.08)', border: '1px solid rgba(200,168,78,0.2)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#c8a84e' }}>
          {pendingCount} comment{pendingCount !== 1 ? 's' : ''} awaiting your review
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t.value} onClick={() => setTab(t.value)}
            style={{
              padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              border: tab === t.value ? '1px solid rgba(200,168,78,0.4)' : '1px solid #2a3022',
              background: tab === t.value ? 'rgba(200,168,78,0.1)' : 'transparent',
              color: tab === t.value ? '#c8a84e' : '#5a6450',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
      ) : comments.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>
          {tab === 'pending' ? 'No comments pending review.' : tab === 'flagged' ? 'No flagged comments.' : 'No comments yet.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {comments.map(c => {
            const sc = STATUS_COLORS[c.status] ?? { bg: 'transparent', color: '#5a6450' };
            return (
              <div key={c.id} style={{ padding: '14px 16px', borderRadius: 10, background: '#1e221a', border: '1px solid #2a3022' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#e8ede2' }}>
                        {c.is_anonymous ? (c.anonymous_display_name || 'Anonymous') : (c.author?.display_name ?? 'Unknown')}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#5a6450' }}>
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                      {c.post && (
                        <Link to={`/intel-board/${c.post.slug}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#9ab87a', textDecoration: 'none' }}>
                          {c.post.title}
                        </Link>
                      )}
                      <span style={{
                        padding: '1px 7px', borderRadius: 100, fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.06em',
                        background: sc.bg, color: sc.color,
                      }}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8a9480', margin: 0, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {c.body}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {c.status !== 'visible' && (
                      <button onClick={() => approve(c.id)} title="Approve — make visible"
                        style={{ padding: 7, borderRadius: 7, background: 'rgba(154,184,122,0.1)', border: '1px solid rgba(154,184,122,0.2)', color: '#9ab87a', cursor: 'pointer' }}>
                        <CheckCircle size={13} />
                      </button>
                    )}
                    <button onClick={() => remove(c.id)} title="Remove"
                      style={{ padding: 7, borderRadius: 7, background: 'transparent', border: '1px solid #2a3022', color: '#cc6666', cursor: 'pointer' }}>
                      <Trash2 size={13} />
                    </button>
                    <button onClick={() => ban(c.author_id)} title="Ban User"
                      style={{ padding: 7, borderRadius: 7, background: 'transparent', border: '1px solid #2a3022', color: '#5a6450', cursor: 'pointer' }}>
                      <ShieldAlert size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminCommentsModeration;
