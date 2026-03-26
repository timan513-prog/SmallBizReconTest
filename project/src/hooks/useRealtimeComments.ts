import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Comment } from '../types/intelBoard';

export function useRealtimeComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const PAGE_SIZE = 20;

  const fetchComments = useCallback(async (reset = false) => {
    const currentPage = reset ? 0 : page;
    const { data, error } = await supabase
      .from('comments')
      .select('*, author:profiles(*)')
      .eq('post_id', postId)
      .eq('status', 'visible')
      .is('parent_id', null)
      .order('created_at', { ascending: true })
      .range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1);

    if (!error && data) {
      const withReplies = await Promise.all(data.map(async (comment) => {
        const { data: replies } = await supabase
          .from('comments')
          .select('*, author:profiles(*)')
          .eq('parent_id', comment.id)
          .eq('status', 'visible')
          .order('created_at', { ascending: true });
        return { ...comment, replies: replies ?? [] };
      }));

      if (reset) {
        setComments(withReplies);
        setPage(1);
      } else {
        setComments(prev => [...prev, ...withReplies]);
        setPage(p => p + 1);
      }
      setHasMore(data.length === PAGE_SIZE);
    }
    setLoading(false);
  }, [postId, page]);

  useEffect(() => {
    setLoading(true);
    fetchComments(true);

    const channel = supabase
      .channel(`comments:${postId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `post_id=eq.${postId}`,
      }, async (payload) => {
        const newComment = payload.new as Comment;
        if (newComment.status !== 'visible') return;

        if (!newComment.parent_id) {
          const { data: profile } = await supabase
            .from('profiles').select('*').eq('id', newComment.author_id).maybeSingle();
          setComments(prev => [...prev, { ...newComment, author: profile, replies: [] }]);
        } else {
          setComments(prev => prev.map(c => {
            if (c.id === newComment.parent_id) {
              return { ...c, replies: [...(c.replies ?? []), newComment] };
            }
            return c;
          }));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [postId]);

  const loadMore = () => fetchComments(false);

  const addOptimistic = (comment: Comment) => {
    if (!comment.parent_id) {
      setComments(prev => [...prev, { ...comment, replies: [] }]);
    } else {
      setComments(prev => prev.map(c => {
        if (c.id === comment.parent_id) {
          return { ...c, replies: [...(c.replies ?? []), comment] };
        }
        return c;
      }));
    }
  };

  return { comments, loading, hasMore, loadMore, addOptimistic, refetch: () => fetchComments(true) };
}
