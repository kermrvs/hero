import { BadRequestException, Injectable } from '@nestjs/common';
import { IHero } from './interfaces/hero.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { HeroDocument } from './schemas/hero.schema';
import { Document } from 'mongoose';

@Injectable()
export class HeroService {
  constructor(@InjectModel('Heroes') private heroModel: Model<HeroDocument>) {}

  async createHero(hero: IHero): Promise<IHero> {
    const isHeroExists = await this._isHeroExists(hero.nickname);

    if (isHeroExists) {
      throw new BadRequestException();
    }
    return this.heroModel.create(hero);
  }

  async getAllHeroes(): Promise<HeroDocument[]> {
    return this.heroModel.find();
  }

  deleteHero(id: string) {
    return this.heroModel.deleteOne({ _id: id });
  }

  async updateHero(hero: IHero): Promise<IHero> {
    return this.heroModel.findOneAndUpdate({ nickname: hero.nickname }, hero, {
      new: true,
    });
  }

  private _isHeroExists(nickname) {
    return this.heroModel.exists({ nickname }).lean();
  }
}
