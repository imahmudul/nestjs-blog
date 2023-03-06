import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.interface';
import {SearchService} from './search.service';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') 
  private readonly articleModel: Model<Article>,
  private searchService: SearchService
  ){}

  async create(article: Article): Promise<Article> {
    const createdArticle = new this.articleModel(article);
    console.log({ createdArticle });
    const newArticle = await createdArticle.save();
    this.searchService.indexArticle(newArticle);
    return newArticle;
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async likeArticle(id: string, userId: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    article.likes.push(userId);
    return article.save();
  }

  async dislikeArticle(id: string, userId: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    article.dislikes.push(userId);
    return article.save();
  }

  async commentArticle(id: string, userId: string, content: string): Promise<Article> {
    const article = await this.articleModel.findById(id).exec();
    article.comments.push({ user: userId, content });
    return article.save();
  }

  async findLikedArticles(userId: string): Promise<Article[]> {
    return this.articleModel.find({ likes: userId }).exec();
  }

  async searchByTagOrCategory(text: string) {
    const results = await this.searchService.search(text);
    console.log(({results}));
    const ids = results.map(result => result.id);
    if (!ids.length) {
      return [];
    }
    return results;
  }
}

