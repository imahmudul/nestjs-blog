import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: { 
          url: 'redis://redis:6379',
        },
      }),
    }),
    ArticleModule,
  ],
  exports: [],
  controllers: [AppController],
  providers: [AppService], 
})

export class AppModule {}