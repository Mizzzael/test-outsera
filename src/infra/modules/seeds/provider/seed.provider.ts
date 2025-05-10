import { DataSource } from 'typeorm';
import { SeedEntity } from '@infra/modules/seeds/model/Seed.entity';

export const seedProviders = [
  {
    provide: 'SEED_REPO',
    useFactory: (dtSource: DataSource) => dtSource.getRepository(SeedEntity),
    inject: ['DB'],
  },
];
