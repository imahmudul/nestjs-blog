import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './article.controller';
import { ArticleSchema } from './article.schema';
import { ArticleService } from './article.service';
import {SearchService}  from './search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])],
  controllers: [ArticlesController],
  providers: [ArticleService, SearchService, {
    provide: ElasticsearchService,
    useValue: new ElasticsearchService({
      node: 'http://localhost:9200',
    }),
  },],
})
export class ArticleModule {}

