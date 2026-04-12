import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, CreditCard as Edit, Trash2, Pin, Star, Archive } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Post, PostStatus } from '../../types/intelBoard';

const STATUSES: { value: PostStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

const AdminPostsManager: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PostStatus | 'all'>('all');

  const fetchPosts = async () => {
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setPosts((data ?? []) as Post[]);
    setLoading(false);
  };

  useEffect(() => { setLoading(true); fetchPosts(); }, [filter]);

  const handleTogglePin = async (post: Post) => {
    await supabase.from('posts').update({ is_pinned: !post.is_pinned }).eq('id', post.id);
    fetchPosts();
  };

  const handleToggleFeature = async (post: Post) => {
    await supabase.from('posts').update({ is_featured: !post.is_featured }).eq('id', post.id);
    fetchPosts();
  };

  const handleArchive = async (post: Post) => {
    await supabase.from('posts').update({ status: 'archived' }).eq('id', post.id);
    fetchPosts();
  };

  const handleDelete = async (post: Post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await supabase.from('posts').delete().eq('id', post.id);
    fetchPosts();
  };

  const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    published: { bg: 'rgba(154,184,122,0.12)', color: '#9ab87a' },
    draft: { bg: 'rgba(200,168,78,0.12)', color: '#c8a84e' },
    archived: { bg: 'rgba(90,100,80,0.2)', color: '#5a6450' },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: '#e8ede2', margin: 0 }}>
          Posts
        </h2>
        <Link to="/intel-board/admin/posts/new"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10,
            background: 'rgba(200,168,78,0.2)', border: '1px solid rgba(200,168,78,0.4)',
            color: '#c8a84e', fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
          }}>
          <Plus size={15} /> New Post
        </Link>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {STATUSES.map(s => (
          <button key={s.value} onClick={() => setFilter(s.value)}
            style={{
              padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              border: filter === s.value ? '1px solid rgba(200,168,78,0.4)' : '1px solid #2a3022',
              background: filter === s.value ? 'rgba(200,168,78,0.1)' : 'transparent',
              color: filter === s.value ? '#c8a84e' : '#5a6450',
            }}>
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
      ) : posts.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>No posts found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {posts.map(post => {
            const sc = STATUS_COLORS[post.status] ?? { bg: 'transparent', color: '#5a6450' };
            return (
              <div key={post.id} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 10,
                background: '#1e221a', border: '1px solid #2a3022', flexWrap: 'wrap',
              }}>
                <span style={{ padding: '2px 8px', borderRadius: 100, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.06em', background: sc.bg, color: sc.color }}>
                  {post.status.toUpperCase()}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#e8ede2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#5a6450', marginTop: 2 }}>
                    {post.category} · {post.comment_count} comments · {post.upvote_count - post.downvote_count} votes
                    {post.published_at && ` · ${new Date(post.published_at).toLocaleDateString()}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button onClick={() => handleTogglePin(post)} title={post.is_pinned ? 'Unpin' : 'Pin'}
                    style={{ padding: 7, borderRadius: 7, background: post.is_pinned ? 'rgba(200,168,78,0.15)' : 'transparent', border: '1px solid #2a3022', color: post.is_pinned ? '#c8a84e' : '#5a6450', cursor: 'pointer' }}>
                    <Pin size={13} />
                  </button>
                  <button onClick={() => handleToggleFeature(post)} title={post.is_featured ? 'Unfeature' : 'Feature'}
                    style={{ padding: 7, borderRadius: 7, background: post.is_featured ? 'rgba(154,184,122,0.15)' : 'transparent', border: '1px solid #2a3022', color: post.is_featured ? '#9ab87a' : '#5a6450', cursor: 'pointer' }}>
                    <Star size={13} />
                  </button>
                  <button onClick={() => navigate(`/intel-board/admin/posts/${post.id}/edit`)} title="Edit"
                    style={{ padding: 7, borderRadius: 7, background: 'transparent', border: '1px solid #2a3022', color: '#5a6450', cursor: 'pointer' }}>
                    <Edit size={13} />
                  </button>
                  {post.status !== 'archived' && (
                    <button onClick={() => handleArchive(post)} title="Archive"
                      style={{ padding: 7, borderRadius: 7, background: 'transparent', border: '1px solid #2a3022', color: '#5a6450', cursor: 'pointer' }}>
                      <Archive size={13} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(post)} title="Delete"
                    style={{ padding: 7, borderRadius: 7, background: 'transparent', border: '1px solid #2a3022', color: '#cc6666', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPostsManager;
