import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HeroModule,
  ],
})
export class AppModule {}
