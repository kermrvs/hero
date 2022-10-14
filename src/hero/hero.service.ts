import { Injectable } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { HeroDocument } from './schemas/hero.schema';
import { Document } from 'mongoose';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [];
  constructor(@InjectModel('Heroes') private heroModel: Model<HeroDocument>) {}
  async createHero(hero: Hero): Promise<boolean | HeroDocument> {
    const isHero = await this.heroModel
      .findOne({ nickname: hero.nickname })
      .select('nickname')
      .lean();

    if (isHero) {
      return false;
    }
    const createdHero = new this.heroModel(hero);
    return createdHero.save();
  }

  async getAllHeroes(): Promise<HeroDocument[]> {
    return this.heroModel.find();
  }

  deleteHero(id: string) {
    return this.heroModel.deleteOne({ _id: id });
  }

  async updateHero(hero: Hero): Promise<HeroDocument> {
    return this.heroModel.findOneAndUpdate({ nickname: hero.nickname }, hero, {
      new: true,
    });
  }
}
