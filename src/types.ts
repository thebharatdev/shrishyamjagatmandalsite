export interface Bhajan {
  id: string;
  title: string;
  singer: string;
  tarj?: string;
  category: string;
  keywords: string[];
  lyrics: string;
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  img: string;
}

export interface TeamMember {
  name: string;
  role: string;
  quote: string;
  img: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type PageRoute = 'home' | 'about' | 'bhajans' | 'bhajan-detail' | 'aarti' | 'stuti' | 'contact';
