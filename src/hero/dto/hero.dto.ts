import { IsArray, IsObject, IsString } from 'class-validator';
export class CreateHeroDto {
  @IsString()
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_description: string;

  @IsString()
  superpowers: string;

  @IsString()
  catch_phrase: string;

  @IsObject({ each: true })
  @IsArray()
  images: ImageDTo[];
}

class ImageDTo {
  @IsString()
  name: string;

  @IsString()
  img: string;
}
