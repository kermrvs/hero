import { CreateHeroDto } from '../../src/hero/dto/hero.dto';

export const heroStub = (): CreateHeroDto => {
  return {
    nickname: 'Superman',
    images: [
      {
        name: 'image1',
        img: 'hhhh',
      },
    ],
    real_name: 'Clark Kent',
    origin_description: 'some description',
    superpowers: 'some superpowers',
    catch_phrase: 'its Superman!',
  };
};

export const heroesStub = (): CreateHeroDto[] => {
  return [
    {
      nickname: 'Superman2',
      images: [
        {
          name: 'image1',
          img: 'hhhh',
        },
      ],
      real_name: 'Clark Kent2',
      origin_description: 'some description2',
      superpowers: 'some superpowers2',
      catch_phrase: 'its Superman2!',
    },
    {
      nickname: 'Superma22n2',
      images: [
        {
          name: 'imag2e1',
          img: 'hhhh',
        },
      ],
      real_name: 'Clark Ke2nt2',
      origin_description: 'some de2scription2',
      superpowers: 'some superpower2s2',
      catch_phrase: 'its Superman2!',
    },
    {
      nickname: 'Superma23n2',
      images: [
        {
          name: 'imag2e1',
          img: 'hhhh',
        },
      ],
      real_name: 'Clark Ke2nt2',
      origin_description: 'some de2scription2',
      superpowers: 'some superpower2s2',
      catch_phrase: 'its Superman2!',
    },
    {
      nickname: 'Superma242n2',
      images: [
        {
          name: 'imag2e1',
          img: 'hhhh',
        },
      ],
      real_name: 'Clark Ke25nt2',
      origin_description: 'some de2scription2',
      superpowers: 'some superpower2s2',
      catch_phrase: 'its Superman2!',
    },

    {
      nickname: 'Superma22n2',
      images: [
        {
          name: 'imag2e1',
          img: 'hhhh',
        },
      ],
      real_name: 'Clark Ke2nt2',
      origin_description: 'some de2scription2',
      superpowers: 'some superpower2s2',
      catch_phrase: 'its Superman2!',
    },
    {
      nickname: 'Superma26n2',
      images: [
        {
          name: 'imag2e1',
          img: 'hhhh',
        },
      ],
      real_name: 'Clark Ke2nt2',
      origin_description: 'some de2scription2',
      superpowers: 'some superpower2s2',
      catch_phrase: 'its Superman2!',
    },
  ];
};
