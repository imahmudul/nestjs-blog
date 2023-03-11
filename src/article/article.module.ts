import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './article.controller';
import { ArticleSchema } from './article.schema';
import { ArticleService } from './services/article.service';
import {SearchService}  from './services/search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';

@Module({

  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])
  ],
  controllers: [ArticlesController],
  providers: [ArticleService, SearchService, {
    provide: ElasticsearchService,
    useValue: new ElasticsearchService({
      node: process.env.ELASTICSEARCH_NODE,
    }),
  },],
})
export class ArticleModule {}

