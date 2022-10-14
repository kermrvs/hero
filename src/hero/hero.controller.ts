import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/hero.dto';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Post()
  async create(@Body() heroDto: CreateHeroDto) {
    return await this.heroService.createHero(heroDto);
  }

  @Get()
  getAllHeroes() {
    return this.heroService.getAllHeroes();
  }

  @Put()
  updateHero(@Body() heroDto: CreateHeroDto) {
    return this.heroService.updateHero(heroDto);
  }

  @Delete(':id')
  deleteHero(@Param('id') id: string) {
    return this.heroService.deleteHero(id);
  }
}
