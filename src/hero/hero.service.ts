import { BadRequestException, Injectable } from '@nestjs/common';
import { IHero } from './interfaces/hero.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { HeroDocument } from './schemas/hero.schema';

@Injectable()
export class HeroService {
  constructor(@InjectModel('Heroes') private heroModel: Model<HeroDocument>) {}

  async createHero(hero: IHero): Promise<IHero> {
    const isHeroExists = await this._isHeroExists(hero.nickname);

    if (isHeroExists) {
      throw new BadRequestException();
    }
    const createdHero = await this.heroModel.create(hero);
    return createdHero.toObject();
  }

  async getAllHeroes(): Promise<HeroDocument[]> {
    return this.heroModel.find().lean();
  }

  async deleteHero(id: string): Promise<void> {
    await this.heroModel.deleteOne({ _id: id });
  }

  async updateHero(hero: IHero): Promise<IHero> {
    return this.heroModel
      .findOneAndUpdate({ nickname: hero.nickname }, hero, {
        new: true,
      })
      .lean();
  }

  async getHeroes(
    page: number,
  ): Promise<{ heroes: IHero[]; maxPages: number }> {
    const maxPages = await this._getPages();

    if (+page > maxPages) {
      throw new BadRequestException();
    }

    const heroes = await this.heroModel
      .find()
      .limit(5)
      .skip(+page === 1 ? 0 : (+page - 1) * 5)
      .lean();

    return {
      heroes,
      maxPages,
    };
  }

  private _isHeroExists(nickname) {
    return this.heroModel.exists({ nickname }).lean();
  }

  private async _getPages(): Promise<number> {
    const countDocuments = await this.heroModel.countDocuments().lean();
    return Math.ceil(countDocuments / 5);
  }
}
