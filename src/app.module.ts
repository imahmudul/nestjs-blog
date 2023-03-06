import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}