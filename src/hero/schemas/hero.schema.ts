import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeroDocument = Hero & Document;

@Schema({ collection: 'Heroes', versionKey: false })
export class Hero {
  @Prop({ required: true })
  nickname: string;
  @Prop({ required: true })
  real_name: string;
  @Prop({ required: true })
  origin_description: string;
  @Prop({ required: true })
  superpowers: string;
  @Prop({ required: true })
  catch_phrase: string;
  @Prop({ require: true })
  images: {
    name: string;
    img: string;
  }[];
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
