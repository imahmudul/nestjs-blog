import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { Article } from './article.interface';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) { }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Post()
  async create(@Body() article: Article): Promise<Article> {
    return this.articleService.create(article);
  }

  @Post(':id/like')
  async likeArticle(@Param('id') id: string, @Body('userId') userId: string): Promise<Article> {
    return this.articleService.likeArticle(id, userId);
  }

  @Post(':id/dislike')
  async dislikeArticle(@Param('id') id: string, @Body('userId') userId: string): Promise<Article> {
    return this.articleService.dislikeArticle(id, userId);
  }

  @Post(':id/comment')
  async commentArticle(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
  ): Promise<Article> {
    return this.articleService.commentArticle(id, userId, content);
  }

  @Get('liked/:userId')
  async findLikedArticles(@Param('userId') userId: string): Promise<Article[]> {
    return this.articleService.findLikedArticles(userId);
  }

  @Get('search')
  async getPosts(@Query('q') search: string) {
    console.log({search});
    if (search) {
      return this.articleService.searchByTagOrCategory(search);
    }
  }

}
