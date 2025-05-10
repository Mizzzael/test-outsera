import { DataSource } from 'typeorm';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';

export const producerRecorrencyProvider = [
  {
    provide: 'PRODUCER_RECORRENCY_REPO',
    useFactory: (dtSource: DataSource) =>
      dtSource.getRepository(ProducerRecorrency),
    inject: ['DB'],
  },
];
