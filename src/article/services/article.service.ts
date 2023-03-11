import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../interfaces/article.interface';
import { SearchService } from './search.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article')
  private readonly articleModel: Model<Article>,
    private searchService: SearchService,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  async create(article): Promise<Article> {
    try {
      const createdArticle = new this.articleModel(article);
      const newArticle = await createdArticle.save();
      await this.searchService.indexArticle(newArticle);
      return newArticle;
    } catch (error) {
      console.error('Cache Error: ', error);
    }
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  // async findArticleById(id: string) {
  //   console.log({id});
  //   try {
  //     const cacheArticle = await this.redis.get(id);
  //     if (cacheArticle) return JSON.parse(cacheArticle);

  //     const article = await this.articleModel.findById(id);
  //     if (!article) throw new Error(`No Article Found!`);
  //     await this.redis.set(article.id, JSON.stringify(article), 'EX', 3600);
  //     return article;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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

  async commentArticle(id: string, comment): Promise<Article> {
    comment = { ...comment, id };
    const article = await this.articleModel.findById(id).exec();
    article.comments.push(comment);
    return article.save();
  }

  async findLikedArticles(userId: string): Promise<Article[]> {
    return this.articleModel.find({ likes: userId }).exec();
  }

}

