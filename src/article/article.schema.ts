import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: Array,
  tags: Array,
  dislikes: Array,
  comments: Array
});

// export interface Article extends mongoose.Document {
//   id: string;
//   title: string;
//   content: string;
//   category: String;
//   author: string;
//   createdAt: Date;
//   updatedAt: Date;
//   likes: any[],
//   tags: string[],
//   dislikes: any[],
//   comments: any[]
// }
