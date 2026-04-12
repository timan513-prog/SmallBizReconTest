export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  pubDate: string;
  category: string;
  source: string;
}

export interface RSSFeedResponse {
  items: NewsItem[];
  lastFetched: string;
  error?: string;
}

export type NewsCategory =
  | 'All'
  | 'Disaster Relief'
  | 'EIDL'
  | 'Policy & Fraud'
  | 'Policy Update'
  | 'SBA News & Updates'
  | 'Disaster Fraud'
  | 'General SBA';
