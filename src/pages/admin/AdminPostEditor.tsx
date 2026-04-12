import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { slugify } from '../../utils/slugify';
import MarkdownRenderer from '../../components/intel-board/MarkdownRenderer';
import type { PostFormData, PostCategory } from '../../types/intelBoard';

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'strategy', label: 'Strategy' },
  { value: 'policy-update', label: 'Policy Update' },
  { value: 'case-study', label: 'Case Study' },
  { value: 'community', label: 'Community' },
  { value: 'treasury-intel', label: 'Treasury Intel' },
  { value: 'borrower-guide', label: 'Borrower Guide' },
  { value: 'announcement', label: 'Announcement' },
];

const DEFAULT_FORM: PostFormData = {
  title: '', subtitle: '', slug: '', category: 'strategy',
  tags: '', cover_image_url: '', body: '', excerpt: '',
  status: 'draft', is_pinned: false, is_featured: false,
  allow_anonymous_comments: false, published_at: new Date().toISOString().slice(0, 16),
};

const AdminPostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [form, setForm] = useState<PostFormData>(DEFAULT_FORM);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (isEdit) {
      supabase.from('posts').select('*').eq('id', id).maybeSingle().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title,
            subtitle: data.subtitle ?? '',
            slug: data.slug,
            category: data.category,
            tags: data.tags.join(', '),
            cover_image_url: data.cover_image_url ?? '',
            body: data.body,
            excerpt: data.excerpt ?? '',
            status: data.status,
            is_pinned: data.is_pinned,
            is_featured: data.is_featured,
            allow_anonymous_comments: data.allow_anonymous_comments,
            published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
          });
          setSlugManual(true);
        }
      });
    }
  }, [id, isEdit]);

  const set = (k: keyof PostFormData, v: unknown) => setForm(f => ({ ...f, [k]: v }));

  const handleTitleChange = (v: string) => {
    set('title', v);
    if (!slugManual) set('slug', slugify(v));
  };

  const insertMarkdown = (before: string, after = '') => {
    const ta = document.getElementById('body-editor') as HTMLTextAreaElement;
    if (!ta) return;
    const start = ta.selectionStart, end = ta.selectionEnd;
    const selected = form.body.slice(start, end);
    const newBody = form.body.slice(0, start) + before + selected + after + form.body.slice(end);
    set('body', newBody);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + before.length, end + before.length); }, 0);
  };

  const handleSave = async (publish = false) => {
    setError(''); setSaving(true);
    try {
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      const excerpt = form.excerpt || form.body.replace(/[#>*_]/g, '').slice(0, 220) + '...';
      const status = publish ? 'published' : form.status;
      const payload = {
        author_id: user!.id,
        slug: form.slug,
        title: form.title,
        subtitle: form.subtitle || null,
        body: form.body,
        excerpt,
        category: form.category,
        tags,
        cover_image_url: form.cover_image_url || null,
        status,
        is_pinned: form.is_pinned,
        is_featured: form.is_featured,
        allow_anonymous_comments: form.allow_anonymous_comments,
        published_at: (status === 'published') ? (form.published_at ? new Date(form.published_at).toISOString() : new Date().toISOString()) : null,
        updated_at: new Date().toISOString(),
      };

      let err;
      if (isEdit) {
        ({ error: err } = await supabase.from('posts').update(payload).eq('id', id));
      } else {
        ({ error: err } = await supabase.from('posts').insert(payload));
      }
      if (err) { setError(err.message); return; }
      setSuccess(publish ? 'Published!' : 'Saved as draft.');
      setTimeout(() => navigate('/intel-board/admin/posts'), 1200);
    } finally {
      setSaving(false);
    }
  };

  const inputS: React.CSSProperties = {
    width: '100%', padding: '9px 12px', borderRadius: 8,
    background: '#1e221a', border: '1px solid #2a3022',
    color: '#e8ede2', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    outline: 'none', transition: 'border-color 0.2s ease',
  };

  const labelS: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 700, color: '#5a6450',
    marginBottom: 5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em',
    textTransform: 'uppercase',
  };

  const TOOLBAR = [
    { label: 'B', md: ['**', '**'], title: 'Bold' },
    { label: 'I', md: ['*', '*'], title: 'Italic' },
    { label: 'H2', md: ['## ', ''], title: 'Heading' },
    { label: '—', md: ['\n---\n', ''], title: 'HR' },
    { label: '>', md: ['> ', ''], title: 'Quote' },
    { label: '`', md: ['`', '`'], title: 'Inline code' },
    { label: '- ', md: ['- ', ''], title: 'List item' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#181c14', color: '#e8ede2', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <button onClick={() => navigate('/intel-board/admin/posts')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#9ab87a', fontSize: 14, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Posts
          </button>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, fontWeight: 400, color: '#e8ede2', margin: 0 }}>
            {isEdit ? 'Edit Post' : 'New Post'}
          </h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setPreview(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: 'transparent', border: '1px solid #2a3022', color: '#8a9480', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {preview ? <EyeOff size={14} /> : <Eye size={14} />}
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={() => handleSave(false)} disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: 'transparent', border: '1px solid #3a4432', color: '#9ab87a', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <Save size={14} /> Save Draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 8, background: 'rgba(200,168,78,0.2)', border: '1px solid rgba(200,168,78,0.4)', color: '#c8a84e', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {saving ? 'Saving...' : (form.status === 'published' ? 'Update' : 'Publish')}
            </button>
          </div>
        </div>

        {error && <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(200,80,80,0.1)', border: '1px solid rgba(200,80,80,0.2)', color: '#cc6666', marginBottom: 16, fontSize: 13 }}>{error}</div>}
        {success && <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(154,184,122,0.1)', border: '1px solid rgba(154,184,122,0.2)', color: '#9ab87a', marginBottom: 16, fontSize: 13 }}>{success}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
          {/* Main editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelS}>Title</label>
              <input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Post title" style={{ ...inputS, fontSize: 18, fontFamily: "'Instrument Serif', Georgia, serif" }}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                onBlur={e => (e.target.style.borderColor = '#2a3022')} />
            </div>
            <div>
              <label style={labelS}>Subtitle (optional)</label>
              <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Optional subtitle" style={inputS}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                onBlur={e => (e.target.style.borderColor = '#2a3022')} />
            </div>
            <div>
              <label style={labelS}>Slug</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#5a6450', flexShrink: 0 }}>/intel-board/</span>
                <input value={form.slug} onChange={e => { setSlugManual(true); set('slug', e.target.value); }}
                  placeholder="post-slug" style={{ ...inputS, flex: 1, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                  onBlur={e => (e.target.style.borderColor = '#2a3022')} />
              </div>
            </div>
            <div>
              <label style={labelS}>Tags (comma-separated)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="eidl, treasury, strategy" style={{ ...inputS, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                onBlur={e => (e.target.style.borderColor = '#2a3022')} />
            </div>
            <div>
              <label style={labelS}>Cover Image URL (optional)</label>
              <input value={form.cover_image_url} onChange={e => set('cover_image_url', e.target.value)} placeholder="https://..." style={inputS}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                onBlur={e => (e.target.style.borderColor = '#2a3022')} />
            </div>

            {/* Body editor */}
            <div>
              <label style={labelS}>Body (Markdown)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                {TOOLBAR.map(t => (
                  <button key={t.label} onClick={() => insertMarkdown(t.md[0], t.md[1])} title={t.title}
                    style={{ padding: '4px 10px', borderRadius: 6, background: '#1e221a', border: '1px solid #2a3022', color: '#9ab87a', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer' }}>
                    {t.label}
                  </button>
                ))}
              </div>
              {preview ? (
                <div style={{ padding: '16px 20px', borderRadius: 10, background: '#1e221a', border: '1px solid #2a3022', minHeight: 400 }}>
                  <MarkdownRenderer content={form.body} />
                </div>
              ) : (
                <textarea
                  id="body-editor"
                  value={form.body}
                  onChange={e => set('body', e.target.value)}
                  rows={20}
                  placeholder="Write your post in Markdown..."
                  style={{ ...inputS, resize: 'vertical', lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, minHeight: 400 }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                  onBlur={e => (e.target.style.borderColor = '#2a3022')}
                />
              )}
            </div>

            <div>
              <label style={labelS}>Excerpt (optional — auto-generated if empty)</label>
              <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} placeholder="Short preview text..." style={{ ...inputS, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                onBlur={e => (e.target.style.borderColor = '#2a3022')} />
            </div>
          </div>

          {/* Settings sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 24 }}>
            <div style={{ padding: '20px', borderRadius: 12, background: '#1e221a', border: '1px solid #2a3022' }}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: '#5a6450', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={labelS}>Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value as PostCategory)} style={{ ...inputS, cursor: 'pointer' }}>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelS}>Status</label>
                  <select value={form.status} onChange={e => set('status', e.target.value)} style={{ ...inputS, cursor: 'pointer' }}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label style={labelS}>Published Date</label>
                  <input type="datetime-local" value={form.published_at} onChange={e => set('published_at', e.target.value)} style={inputS}
                    onFocus={e => (e.target.style.borderColor = 'rgba(200,168,78,0.4)')}
                    onBlur={e => (e.target.style.borderColor = '#2a3022')} />
                </div>
                {[
                  { key: 'is_pinned', label: 'Pin this post' },
                  { key: 'is_featured', label: 'Feature this post' },
                  { key: 'allow_anonymous_comments', label: 'Allow anonymous comments' },
                ].map(item => (
                  <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form[item.key as keyof PostFormData] as boolean}
                      onChange={e => set(item.key as keyof PostFormData, e.target.checked)}
                      style={{ accentColor: '#c8a84e', width: 16, height: 16 }}
                    />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8a9480' }}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostEditor;
