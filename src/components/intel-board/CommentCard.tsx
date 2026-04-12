import React, { useState } from 'react';
import { User, Flag, MoveVertical as MoreVertical, Trash2, ShieldAlert } from 'lucide-react';
import type { Comment } from '../../types/intelBoard';
import { useAuth } from '../../contexts/AuthContext';
import PostVoteControls from './PostVoteControls';
import MarkdownRenderer from './MarkdownRenderer';
import { timeAgo } from '../../utils/timeAgo';
import { supabase } from '../../lib/supabase';

interface Props {
  comment: Comment;
  depth?: number;
  onRequireAuth: () => void;
  onReply: (parentId: string, parentAuthor: string) => void;
  onDeleted: (commentId: string) => void;
}

const CommentCard: React.FC<Props> = ({ comment, depth = 0, onRequireAuth, onReply, onDeleted }) => {
  const { user, isAdmin, profile } = useAuth();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [reportReason, setReportReason] = useState('spam');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSent, setReportSent] = useState(false);

  const authorName = comment.is_anonymous
    ? (comment.anonymous_display_name || 'Anonymous Borrower')
    : (comment.author?.display_name || 'Unknown User');

  const isAuthorAdmin = comment.author?.role === 'admin';
  const isOwnComment = user?.id === comment.author_id;

  const handleDelete = async () => {
    if (!confirm('Remove this comment?')) return;
    await supabase.from('comments').update({ status: 'removed' }).eq('id', comment.id);
    onDeleted(comment.id);
  };

  const handleFlag = async () => {
    await supabase.from('comments').update({ status: 'flagged' }).eq('id', comment.id);
    setShowAdminMenu(false);
  };

  const handleBan = async () => {
    if (!comment.author_id) return;
    if (!confirm('Ban this user?')) return;
    await supabase.from('profiles').update({ is_banned: true }).eq('id', comment.author_id);
    setShowAdminMenu(false);
  };

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { onRequireAuth(); return; }
    await supabase.from('comment_reports').insert({
      comment_id: comment.id,
      reporter_id: user.id,
      reason: reportReason,
      details: reportDetails || null,
    });
    setReportSent(true);
  };

  const marginLeft = Math.min(depth, 3) * 24;

  return (
    <div style={{ marginLeft, animation: 'commentSlideIn 0.35s ease both' }}>
      <div style={{
        padding: '14px 18px',
        borderRadius: 12,
        background: depth === 0 ? 'var(--bg-card, rgba(30,34,26,0.6))' : 'var(--bg-tertiary, rgba(38,44,32,0.5))',
        border: '1px solid var(--border-primary, rgba(154,184,122,0.1))',
        backdropFilter: 'var(--glass-blur, blur(24px))',
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <PostVoteControls
            commentId={comment.id}
            upvotes={comment.upvote_count}
            downvotes={comment.downvote_count}
            compact
            onRequireAuth={onRequireAuth}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {comment.is_anonymous
                    ? <User size={14} color="rgba(200,168,78,0.5)" />
                    : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: '#c8a84e' }}>
                        {authorName[0]?.toUpperCase()}
                      </span>
                  }
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text-primary, #e8ede2)' }}>
                  {authorName}
                </span>
                {isAuthorAdmin && (
                  <span style={{
                    padding: '1px 7px', borderRadius: 100, fontSize: 9,
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.08em',
                    background: 'rgba(200,168,78,0.12)', border: '1px solid rgba(200,168,78,0.25)', color: '#c8a84e',
                  }}>
                    AUTHOR
                  </span>
                )}
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted, #5a6450)' }}>
                  {timeAgo(comment.created_at)}
                </span>
              </div>

              {isAdmin && (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowAdminMenu(v => !v)}
                    aria-label="Admin actions"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #5a6450)', padding: 4 }}
                  >
                    <MoreVertical size={15} />
                  </button>
                  {showAdminMenu && (
                    <div style={{
                      position: 'absolute', right: 0, top: '100%', zIndex: 10, minWidth: 160,
                      background: '#181c14', border: '1px solid rgba(200,168,78,0.2)', borderRadius: 10,
                      padding: '6px 0', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}>
                      {[
                        { label: 'Flag', icon: <Flag size={13} />, action: handleFlag },
                        { label: 'Remove', icon: <Trash2 size={13} />, action: handleDelete },
                        { label: 'Ban User', icon: <ShieldAlert size={13} />, action: handleBan },
                      ].map(item => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                            padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                            color: '#8a9480', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                            textAlign: 'left', transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                        >
                          {item.icon} {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <MarkdownRenderer content={comment.body} compact />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
              <button
                onClick={() => { if (!user) { onRequireAuth(); return; } onReply(comment.id, authorName); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c8a84e', fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: 0 }}
              >
                Reply
              </button>
              {!reportSent && (
                <button
                  onClick={() => setReporting(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted, #5a6450)', fontSize: 12, fontFamily: "'DM Sans', sans-serif", padding: 0 }}
                >
                  Report
                </button>
              )}
              {reportSent && (
                <span style={{ fontSize: 12, color: '#9ab87a', fontFamily: "'DM Sans', sans-serif" }}>Reported</span>
              )}
              {(isOwnComment || isAdmin) && (
                <button
                  onClick={handleDelete}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cc6666', fontSize: 12, fontFamily: "'DM Sans', sans-serif", padding: 0 }}
                >
                  Delete
                </button>
              )}
            </div>

            {reporting && !reportSent && (
              <form onSubmit={handleReport} style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <select
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(38,44,32,0.5)', border: '1px solid rgba(154,184,122,0.15)', color: '#e8ede2', fontSize: 12, fontFamily: "'DM Sans', sans-serif", outline: 'none' }}
                >
                  {['spam', 'harassment', 'misinformation', 'personal-info', 'off-topic', 'other'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <textarea
                  value={reportDetails}
                  onChange={e => setReportDetails(e.target.value)}
                  placeholder="Optional additional context..."
                  rows={2}
                  style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(38,44,32,0.5)', border: '1px solid rgba(154,184,122,0.15)', color: '#e8ede2', fontSize: 12, fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="submit" style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(200,80,80,0.15)', border: '1px solid rgba(200,80,80,0.3)', color: '#cc6666', fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
                    Submit Report
                  </button>
                  <button type="button" onClick={() => setReporting(false)} style={{ padding: '6px 14px', borderRadius: 8, background: 'none', border: '1px solid rgba(154,184,122,0.1)', color: '#5a6450', fontSize: 12, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.map(reply => (
        <div key={reply.id} style={{ marginTop: 8 }}>
          <CommentCard
            comment={reply}
            depth={depth + 1}
            onRequireAuth={onRequireAuth}
            onReply={onReply}
            onDeleted={onDeleted}
          />
        </div>
      ))}

      <style>{`
        @keyframes commentSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CommentCard;
