import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from '../article.controller';
import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/createArticle.dto';
import { SearchService } from '../services/search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LikeDto } from '../dtos/like.dto';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticleService;

  const mockArticlesService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),

    findAll: jest.fn(dto => [{
      id: Date.now(),
      ...dto
    }]),

    likeArticle: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticleService, SearchService, {
        provide: ElasticsearchService,
        useValue: new ElasticsearchService({
          node: 'http://localhost:9200',
        }),
      }],
    }).overrideProvider(ArticleService).useValue(mockArticlesService).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new article', async () => {

    const articleDto: CreateArticleDto = {
      title: 'New Article',
      content: 'Article content',
      tags: ['demo'],
      category: 'demo',
      likes: [],
      dislikes: [],
      comments: [],
      createdAt: new Date,
      updatedAt: new Date
    };

    const result = {
      id: expect.any(Number),
      title: 'New Article',
      content: 'Article content',
      tags: ['demo'],
      category: 'demo',
      likes: [],
      dislikes: [],
      comments: [],
      createdAt: new Date,
      updatedAt: new Date
    };
    const data = await controller.create(articleDto);
    console.log({data});
    expect(await controller.create(articleDto)).toEqual(result);
  });

  // Add more test cases for the other controller methods
});
