export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  isVerified: boolean;
  category: string;
  summary: string;
  citations: number;
  date: string;
  imageUrl?: string;
  categoryColor?: string;
}

export type Topic = {
  id: string;
  label: string;
  icon: string;
};
