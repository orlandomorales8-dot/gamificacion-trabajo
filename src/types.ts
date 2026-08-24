export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SectionContent {
  heading: string;
  paragraphs: string[];
  keyPoints?: string[];
  quote?: {
    text: string;
    author: string;
  };
  highlightBox?: {
    title: string;
    description: string;
    tag?: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: 'Teoría' | 'Mecánicas' | 'Historia' | 'Principios' | 'Aplicaciones' | 'Casos Reales';
  tags: string[];
  readTimeMinutes: number;
  date: string;
  author: Author;
  coverAccent: string;
  iconName: string;
  xpReward: number;
  featured?: boolean;
  sections: SectionContent[];
  takeaways: string[];
  quiz?: QuizQuestion;
  references: string[];
}

export interface ReaderStats {
  xp: number;
  level: number;
  levelTitle: string;
  readArticleIds: string[];
  bookmarkedIds: string[];
  completedQuizzes: string[];
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
