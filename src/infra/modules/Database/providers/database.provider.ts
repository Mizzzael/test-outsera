import { DataSource } from 'typeorm';
import { SeedEntity } from '@infra/modules/seeds/model/Seed.entity';
import { Producer } from '@domains/Producer/models/Producer.entity';
import { Movie } from '@domains/Movie/models/Movie.entity';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';

export const DatabaseProvider = [
  {
    provide: 'DB',
    useFactory: async () => {
      const dbSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',
        entities: [Producer, Movie, ProducerRecorrency, SeedEntity],
        synchronize: true,
      });

      return dbSource.initialize();
    },
  },
];
