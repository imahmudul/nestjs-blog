import { Document } from 'mongoose';

export interface Article extends Document {
  readonly title: string;
  readonly content: string;
  readonly category: string;
  readonly tags: string[];
  readonly likes: any[];
  readonly dislikes: any[];
  readonly comments: Comment[];
}

interface Comment {
  user: string;
  content: string;
}
