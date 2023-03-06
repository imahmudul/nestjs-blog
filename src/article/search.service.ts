import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Article } from './article.interface';
import { SearchResult } from './searchResponse.interface';
import { SearchBody } from './searchBody.interface';

@Injectable()
export class SearchService {
  index = 'articles'

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) { }

  async indexArticle(article: Article) {
    return this.elasticsearchService.index<SearchResult, SearchBody>({
      index: this.index,
      body: {
        id: article._id,
        title: article.title,
        content: article.content,
        tags: article.tags,
        category: article.category
      }
    })
  }

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<SearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['tags', 'category']
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}