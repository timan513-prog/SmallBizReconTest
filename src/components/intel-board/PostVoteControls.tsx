import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useVote } from '../../hooks/useVote';

interface Props {
  postId?: string;
  commentId?: string;
  upvotes: number;
  downvotes: number;
  compact?: boolean;
  onRequireAuth: () => void;
}

const PostVoteControls: React.FC<Props> = ({ postId, commentId, upvotes, downvotes, compact = false, onRequireAuth }) => {
  const { upvotes: up, downvotes: down, userReaction, vote } = useVote({
    postId, commentId, initialUpvotes: upvotes, initialDownvotes: downvotes,
  });
  const net = up - down;
  const size = compact ? 14 : 18;
  const countSize = compact ? 12 : 15;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      width: compact ? 32 : 44,
      flexShrink: 0,
    }}>
      <button
        aria-label="Upvote"
        aria-pressed={userReaction === 'upvote'}
        onClick={() => vote('upvote', onRequireAuth)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: compact ? 3 : 6,
          borderRadius: 6,
          color: userReaction === 'upvote' ? '#c8a84e' : 'var(--text-muted, #5a6450)',
          transition: 'color 0.2s ease, background 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#c8a84e'}
        onMouseLeave={e => e.currentTarget.style.color = userReaction === 'upvote' ? '#c8a84e' : 'var(--text-muted, #5a6450)'}
      >
        <ChevronUp size={size} aria-hidden="true" />
      </button>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: countSize,
        fontWeight: 700,
        color: net > 0 ? '#c8a84e' : net < 0 ? '#cc6666' : 'var(--text-muted, #5a6450)',
        lineHeight: 1,
        minWidth: compact ? 20 : 28,
        textAlign: 'center',
      }}>
        {net}
      </span>
      <button
        aria-label="Downvote"
        aria-pressed={userReaction === 'downvote'}
        onClick={() => vote('downvote', onRequireAuth)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: compact ? 3 : 6,
          borderRadius: 6,
          color: userReaction === 'downvote' ? '#cc6666' : 'var(--text-muted, #5a6450)',
          transition: 'color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#cc6666'}
        onMouseLeave={e => e.currentTarget.style.color = userReaction === 'downvote' ? '#cc6666' : 'var(--text-muted, #5a6450)'}
      >
        <ChevronDown size={size} aria-hidden="true" />
      </button>
    </div>
  );
};

export default PostVoteControls;
