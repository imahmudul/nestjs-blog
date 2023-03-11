import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Article } from '../interfaces/article.interface';
import { SearchResult } from '../interfaces/searchResponse.interface';
import { SearchBody } from '../interfaces/searchBody.interface';

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

  async searchByTagOrCategory(text: string) {
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
    const result = hits.map((item) => item._source);
    return result;
  }
}