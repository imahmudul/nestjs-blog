import { Controller, Catch, Get, Post, Body, Param, Query, UseInterceptors, InternalServerErrorException, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './services/article.service';
import { Article } from './interfaces/article.interface';
import { CreateArticleDto } from './dtos/createArticle.dto';
import { LikeDto } from './dtos/like.dto';
import { DislikeDto } from './dtos/dislike.dto';
import { CommentDto } from './dtos/comment.dto';
import { SearchService } from './services/search.service';

@ApiTags('Articles')
@Catch()
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly searchService: SearchService,
  ) { }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.articleService.findArticleById(id);
  // }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleService.create(createArticleDto);
  }

  @Post(':id/like')
  async likeArticle(@Param('id') id: string, @Body() likeDto: LikeDto): Promise<Article> {
    const { userId } = likeDto;
    const data = await this.articleService.likeArticle(id, userId);
    console.log({ data });
    return data;
  }

  @Post(':id/dislike')
  async dislikeArticle(@Param('id') id: string, @Body() dislikeDto: DislikeDto): Promise<Article> {
    const { userId } = dislikeDto;
    return await this.articleService.dislikeArticle(id, userId);
  }

  @Post(':id/comment')
  async commentArticle(
    @Param('id') id: string,
    @Body() commentDto: CommentDto
  ): Promise<Article> {
    return await this.articleService.commentArticle(id, CommentDto);
  }

  @Get('liked/:userId')
  async findLikedArticles(@Param('userId') userId: string): Promise<Article[]> {
    return await this.articleService.findLikedArticles(userId);
  }

  @Get('search')
  async searchArticle(@Query('q') search: string) {
    console.log({ search });
    if (search) {
      return this.searchService.searchByTagOrCategory(search);
    }
  }

}
