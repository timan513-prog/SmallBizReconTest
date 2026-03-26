import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { FileText, MessageSquare, Flag, LayoutDashboard, Users, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const NAV = [
  { path: '/intel-board/admin/posts', label: 'Posts', icon: <FileText size={16} /> },
  { path: '/intel-board/admin/comments', label: 'Comments', icon: <MessageSquare size={16} /> },
  { path: '/intel-board/admin/reports', label: 'Reports', icon: <Flag size={16} /> },
];

interface Stats {
  boardViews: number;
  postViews: number;
  pendingComments: number;
  totalComments: number;
}

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const [boardRes, postRes, pendingRes, totalRes] = await Promise.all([
        supabase.from('intel_board_views').select('id', { count: 'exact', head: true }).eq('page', 'board'),
        supabase.from('intel_board_views').select('id', { count: 'exact', head: true }).neq('page', 'board'),
        supabase.from('comments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('comments').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        boardViews: boardRes.count ?? 0,
        postViews: postRes.count ?? 0,
        pendingComments: pendingRes.count ?? 0,
        totalComments: totalRes.count ?? 0,
      });
    })();
  }, [isAdmin]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#181c14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const isRoot = location.pathname === '/intel-board/admin' || location.pathname === '/intel-board/admin/';

  return (
    <div style={{ minHeight: '100vh', background: '#181c14', color: '#e8ede2', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1e221a', borderBottom: '1px solid #2a3022', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LayoutDashboard size={18} color="#c8a84e" />
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 18, fontWeight: 400, color: '#e8ede2' }}>
            Intel Board Admin
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/intel-board" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#9ab87a', textDecoration: 'none' }}>
            ← View Board
          </Link>
          <button
            onClick={() => signOut()}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: '#5a6450', background: 'none', border: '1px solid #2a3022',
              borderRadius: 8, padding: '6px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#e8ede2'; e.currentTarget.style.borderColor = '#5a6450'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#5a6450'; e.currentTarget.style.borderColor = '#2a3022'; }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <nav style={{ width: 200, background: '#1e221a', borderRight: '1px solid #2a3022', padding: '24px 0', flexShrink: 0 }}>
          {NAV.map(item => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 20px', textDecoration: 'none',
                  background: active ? 'rgba(200,168,78,0.08)' : 'transparent',
                  borderLeft: active ? '3px solid #c8a84e' : '3px solid transparent',
                  color: active ? '#c8a84e' : '#5a6450',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#8a9480'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#5a6450'; }}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <main style={{ flex: 1, padding: '32px 28px', overflowY: 'auto' }}>
          {isRoot && stats && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: '#e8ede2', marginBottom: 20 }}>
                Overview
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                {[
                  { label: 'Board Page Visits', value: stats.boardViews.toLocaleString(), icon: <Users size={18} color="#9ab87a" />, color: '#9ab87a' },
                  { label: 'Post Page Visits', value: stats.postViews.toLocaleString(), icon: <Eye size={18} color="#c8a84e" />, color: '#c8a84e' },
                  { label: 'Pending Comments', value: stats.pendingComments.toLocaleString(), icon: <MessageSquare size={18} color={stats.pendingComments > 0 ? '#c8a84e' : '#5a6450'} />, color: stats.pendingComments > 0 ? '#c8a84e' : '#5a6450' },
                  { label: 'Total Comments', value: stats.totalComments.toLocaleString(), icon: <MessageSquare size={18} color="#5a6450" />, color: '#5a6450' },
                ].map(s => (
                  <div key={s.label} style={{ padding: '18px 20px', borderRadius: 12, background: '#1e221a', border: '1px solid #2a3022' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      {s.icon}
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: '#5a6450', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
                        {s.label}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, fontWeight: 400, color: s.color }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
              {stats.pendingComments > 0 && (
                <div style={{ marginTop: 14 }}>
                  <Link
                    to="/intel-board/admin/comments"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8,
                      background: 'rgba(200,168,78,0.1)', border: '1px solid rgba(200,168,78,0.3)',
                      color: '#c8a84e', fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    }}
                  >
                    Review {stats.pendingComments} pending comment{stats.pendingComments !== 1 ? 's' : ''} →
                  </Link>
                </div>
              )}
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
