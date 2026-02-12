import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { CompanyModule } from './modules/company/company.module';
import { JobPostingRankingModule } from './modules/job-posting-ranking/job-posting-ranking.module';
import { JobPostingModule } from './modules/job-posting/job-posting.module';
import { LastUpdateModule } from './modules/last-update/last-update.module';
import { LogModule } from './modules/log/log.module';
import { SearchModule } from './modules/search/search.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      timezone: 'Z',
    }),
    JobPostingModule,
    AuthModule,
    UserModule,
    BookmarkModule,
    JobPostingRankingModule,
    LastUpdateModule,
    LogModule,
    CompanyModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
