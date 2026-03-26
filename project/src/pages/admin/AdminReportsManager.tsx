import React, { useState, useEffect } from 'react';
import { CircleCheck as CheckCircle, Trash2, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { CommentReport } from '../../types/intelBoard';

const AdminReportsManager: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<CommentReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('comment_reports')
      .select('*, comment:comments(body, status, author_id), reporter:profiles(display_name)')
      .order('created_at', { ascending: false });
    setReports((data ?? []) as CommentReport[]);
    setLoading(false);
  };

  useEffect(() => { fetchReports(); }, []);

  const dismiss = async (id: string) => {
    await supabase.from('comment_reports').update({ status: 'dismissed', reviewed_by: user!.id }).eq('id', id);
    fetchReports();
  };

  const removeComment = async (report: CommentReport) => {
    await supabase.from('comments').update({ status: 'removed' }).eq('id', report.comment_id);
    await supabase.from('comment_reports').update({ status: 'reviewed', reviewed_by: user!.id }).eq('id', report.id);
    fetchReports();
  };

  const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending: { bg: 'rgba(200,168,78,0.12)', color: '#c8a84e' },
    reviewed: { bg: 'rgba(154,184,122,0.1)', color: '#9ab87a' },
    dismissed: { bg: 'rgba(90,100,80,0.15)', color: '#5a6450' },
  };

  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, fontWeight: 400, color: '#e8ede2', marginBottom: 20 }}>
        Reports
      </h2>

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>Loading...</div>
      ) : reports.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#5a6450', fontFamily: "'DM Sans', sans-serif" }}>No reports yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reports.map(r => {
            const sc = STATUS_COLORS[r.status] ?? { bg: 'transparent', color: '#5a6450' };
            return (
              <div key={r.id} style={{ padding: '14px 16px', borderRadius: 10, background: '#1e221a', border: '1px solid #2a3022' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ padding: '1px 7px', borderRadius: 100, fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.06em', background: sc.bg, color: sc.color }}>
                        {r.status.toUpperCase()}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#c8a84e', fontWeight: 700 }}>{r.reason}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5a6450' }}>
                        by {(r.reporter as unknown as { display_name: string })?.display_name ?? 'Unknown'}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#5a6450' }}>
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {r.details && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#8a9480', margin: '0 0 6px' }}>
                        Details: {r.details}
                      </p>
                    )}
                    {r.comment && (
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5a6450', margin: 0, fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        "{(r.comment as unknown as { body: string }).body}"
                      </p>
                    )}
                  </div>
                  {r.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      <button onClick={() => dismiss(r.id)} title="Dismiss"
                        style={{ padding: 7, borderRadius: 7, background: 'rgba(154,184,122,0.1)', border: '1px solid rgba(154,184,122,0.2)', color: '#9ab87a', cursor: 'pointer' }}>
                        <CheckCircle size={13} />
                      </button>
                      <button onClick={() => removeComment(r)} title="Remove comment"
                        style={{ padding: 7, borderRadius: 7, background: 'transparent', border: '1px solid #2a3022', color: '#cc6666', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminReportsManager;
