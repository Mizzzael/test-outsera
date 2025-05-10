import { DataSource } from 'typeorm';
import { Producer } from '@domains/Producer/models/Producer.entity';

export const producerProvider = [
  {
    provide: 'PRODUCER_REPO',
    useFactory: (dtSource: DataSource) => dtSource.getRepository(Producer),
    inject: ['DB'],
  },
];
