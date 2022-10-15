import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { HeroController } from '../src/hero/hero.controller';
import { HeroService } from '../src/hero/hero.service';
import { Connection, connect, Model } from 'mongoose';
import { HeroSchema, Hero } from '../src/hero/schemas/hero.schema';
import { getModelToken } from '@nestjs/mongoose';
import { heroesStub, heroStub } from './stubs/hero.stub';

describe('HeroController', () => {
  let heroController: HeroController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let heroModel: Model<Hero>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoConnection = (await connect(uri)).connection;

    heroModel = mongoConnection.model('Heroes', HeroSchema);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [HeroController],
      providers: [
        HeroService,
        { provide: getModelToken('Heroes'), useValue: heroModel },
      ],
    }).compile();
    heroController = app.get<HeroController>(HeroController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    await mongoConnection.collections.Heroes.deleteMany({});
  });

  describe('create', () => {
    it('should create hero and return', async () => {
      const hero = heroStub();
      const createdHero = await heroController.create(hero);

      expect(createdHero.nickname).toBe(heroStub().nickname);

      const heroFromDb = await mongoConnection.collections.Heroes.findOne({
        nickname: createdHero.nickname,
      });

      expect(heroFromDb).not.toBeNull();
      expect(heroFromDb).toEqual(createdHero);
    });
  });

  describe('getAllHeroes', () => {
    it('should return hero array', async () => {
      const hero = heroStub();
      const { insertedId } = await mongoConnection.collections.Heroes.insertOne(
        hero,
      );

      const allHeroes = await heroController.getAllHeroes();

      expect(allHeroes[0]).toEqual({
        ...hero,
        _id: insertedId,
      });
    });
  });

  describe('getHeroes', () => {
    it('should return first 5 elements', async () => {
      const heroesList = heroesStub();
      await mongoConnection.collections.Heroes.insertMany(heroesList);

      const { heroes } = await heroController.getHeroes(1);

      expect(heroes.length).toBe(5);
    });
  });

  describe('updateHero', () => {
    it('should update hero and return hero update', async () => {
      const hero = heroStub();
      const createdHero = await mongoConnection.collections.Heroes.insertOne(
        hero,
      );
      hero.real_name = 'new real name';

      const updatedHero = await heroController.updateHero(hero);
      expect(updatedHero.real_name).toBe(hero.real_name);

      const heroFromDB = await mongoConnection.collections.Heroes.findOne({
        nickname: hero.nickname,
      });

      expect(heroFromDB.nickname).toBe(hero.nickname);
    });
  });

  describe('deleteHero', () => {
    it('should delete hero', async () => {
      const hero = heroStub();
      const { insertedId } = await mongoConnection.collections.Heroes.insertOne(
        hero,
      );

      await heroController.deleteHero(insertedId.toString());

      const getHero = await mongoConnection.collections.Heroes.findOne({
        nickname: hero.nickname,
      });

      expect(getHero).toBeNull();
    });
  });
});
