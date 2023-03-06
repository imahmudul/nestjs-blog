import { Document } from 'mongoose';

export interface Article extends Document {
  readonly title: string;
  readonly content: string;
  readonly category: string;
  readonly tags: string[];
  readonly likes: string[];
  readonly dislikes: string[];
  readonly comments: Comment[];
}

interface Comment {
  user: string;
  content: string;
}
