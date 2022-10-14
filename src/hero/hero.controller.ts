import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/hero.dto';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() heroDto: CreateHeroDto) {
    const hero = await this.heroService.createHero(heroDto);
    if (hero) {
      return hero;
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  getAllHeroes() {
    return this.heroService.getAllHeroes();
  }

  @Patch('update')
  updateHero(@Body() heroDto: CreateHeroDto) {
    return this.heroService.updateHero(heroDto);
  }

  @Delete('delete/:id')
  deleteHero(@Param('id') id: string) {
    return this.heroService.deleteHero(id);
  }
}
