export type PostCategory =
  | 'strategy'
  | 'policy-update'
  | 'case-study'
  | 'community'
  | 'treasury-intel'
  | 'borrower-guide'
  | 'announcement';

export type PostStatus = 'draft' | 'published' | 'archived';

export type CommentStatus = 'visible' | 'flagged' | 'removed' | 'pending';

export type ReactionType = 'upvote' | 'downvote';

export type UserRole = 'admin' | 'moderator' | 'user';

export type ReportReason = 'spam' | 'harassment' | 'misinformation' | 'personal-info' | 'off-topic' | 'other';

export type ReportStatus = 'pending' | 'reviewed' | 'dismissed';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  role: UserRole;
  is_banned: boolean;
  ban_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  body: string;
  excerpt: string | null;
  category: PostCategory;
  tags: string[];
  cover_image_url: string | null;
  status: PostStatus;
  is_pinned: boolean;
  is_featured: boolean;
  allow_anonymous_comments: boolean;
  comment_count: number;
  upvote_count: number;
  downvote_count: number;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string | null;
  parent_id: string | null;
  body: string;
  is_anonymous: boolean;
  anonymous_display_name: string;
  status: CommentStatus;
  flag_reason: string | null;
  upvote_count: number;
  downvote_count: number;
  created_at: string;
  updated_at: string;
  author?: Profile | null;
  replies?: Comment[];
}

export interface Reaction {
  id: string;
  user_id: string;
  post_id: string | null;
  comment_id: string | null;
  reaction_type: ReactionType;
  created_at: string;
}

export interface CommentReport {
  id: string;
  comment_id: string;
  reporter_id: string;
  reason: ReportReason;
  details: string | null;
  status: ReportStatus;
  reviewed_by: string | null;
  created_at: string;
  comment?: Comment;
  reporter?: Profile;
}

export interface PostFormData {
  title: string;
  subtitle: string;
  slug: string;
  category: PostCategory;
  tags: string;
  cover_image_url: string;
  body: string;
  excerpt: string;
  status: PostStatus;
  is_pinned: boolean;
  is_featured: boolean;
  allow_anonymous_comments: boolean;
  published_at: string;
}
