import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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

  @Get('all')
  getAllHeroes() {
    return this.heroService.getAllHeroes();
  }

  @Get()
  getHeroes(@Query() query) {
    return this.heroService.getHeroes(query.page);
  }

  @Put()
  updateHero(@Body() heroDto: CreateHeroDto) {
    return this.heroService.updateHero(heroDto);
  }

  @Delete(':id')
  async deleteHero(@Param('id') id: string) {
    await this.heroService.deleteHero(id);
  }
}
