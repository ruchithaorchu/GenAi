
export enum AppView {
  DASHBOARD = 'dashboard',
  BRAND_IDENTITY = 'brand_identity',
  CONTENT_STUDIO = 'content_studio',
  INSIGHTS = 'insights',
  ASSISTANT = 'assistant'
}

export interface BrandProject {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  keywords: string[];
  tone: string;
  createdAt: string;
}

export interface ContentAsset {
  id: string;
  type: 'ad' | 'website' | 'social';
  title: string;
  content: string;
  projectId: string;
}

export interface SentimentResult {
  score: number;
  label: 'Positive' | 'Neutral' | 'Negative';
  breakdown: {
    trust: number;
    excitement: number;
    satisfaction: number;
  };
  summary: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
