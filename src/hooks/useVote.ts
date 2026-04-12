import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { ReactionType } from '../types/intelBoard';

interface UseVoteProps {
  postId?: string;
  commentId?: string;
  initialUpvotes: number;
  initialDownvotes: number;
}

export function useVote({ postId, commentId, initialUpvotes, initialDownvotes }: UseVoteProps) {
  const { user, isAuthenticated } = useAuth();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpvotes(initialUpvotes);
    setDownvotes(initialDownvotes);
  }, [initialUpvotes, initialDownvotes]);

  useEffect(() => {
    if (!user) { setUserReaction(null); return; }
    const fetchReaction = async () => {
      let query = supabase.from('reactions').select('reaction_type').eq('user_id', user.id);
      if (postId) query = query.eq('post_id', postId);
      if (commentId) query = query.eq('comment_id', commentId);
      const { data } = await query.maybeSingle();
      setUserReaction(data?.reaction_type ?? null);
    };
    fetchReaction();
  }, [user, postId, commentId]);

  const vote = async (type: ReactionType, onRequireAuth: () => void) => {
    if (!isAuthenticated) { onRequireAuth(); return; }
    if (loading) return;
    setLoading(true);

    try {
      if (userReaction === type) {
        await supabase.from('reactions').delete().eq('user_id', user!.id)
          .eq(postId ? 'post_id' : 'comment_id', postId ?? commentId);
        setUserReaction(null);
        if (type === 'upvote') setUpvotes(v => Math.max(0, v - 1));
        else setDownvotes(v => Math.max(0, v - 1));
      } else {
        const payload: Record<string, unknown> = { user_id: user!.id, reaction_type: type };
        if (postId) payload.post_id = postId;
        if (commentId) payload.comment_id = commentId;

        if (userReaction) {
          await supabase.from('reactions').update({ reaction_type: type })
            .eq('user_id', user!.id)
            .eq(postId ? 'post_id' : 'comment_id', postId ?? commentId);
          if (userReaction === 'upvote') { setUpvotes(v => Math.max(0, v - 1)); setDownvotes(v => v + 1); }
          else { setDownvotes(v => Math.max(0, v - 1)); setUpvotes(v => v + 1); }
        } else {
          await supabase.from('reactions').insert(payload);
          if (type === 'upvote') setUpvotes(v => v + 1);
          else setDownvotes(v => v + 1);
        }
        setUserReaction(type);
      }
    } finally {
      setLoading(false);
    }
  };

  return { upvotes, downvotes, userReaction, vote, loading };
}
