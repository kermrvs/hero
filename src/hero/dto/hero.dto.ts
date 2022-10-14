import { IsArray, IsString } from 'class-validator';
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
  @IsArray()
  images: {
    name: string;
    img: string;
  }[];
}
