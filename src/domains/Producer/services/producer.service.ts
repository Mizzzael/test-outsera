import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '@domains/Producer/models/Producer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProducerService {
  constructor(
    @Inject('PRODUCER_REPO')
    private repositore: Repository<Producer>,
  ) {}

  public async checkIfProducerExists(name: string): Promise<boolean> {
    const count: number = await this.repositore.count({
      where: {
        name,
      },
    });
    return count > 0;
  }

  public async addNewProducer(
    producer: Producer,
  ): Promise<Producer | undefined> {
    const exist = await this.checkIfProducerExists(producer.name);
    if (exist) return undefined;
    return this.repositore.save(producer);
  }

  public async getProducerByName(name: string): Promise<Producer | null> {
    const response = await this.repositore.findOne({
      where: {
        name,
      },
    });

    return response;
  }

  public async saveMultiplesProducers(
    producersName: Set<string>,
  ): Promise<Producer[]> {
    const newProducersSaved = [...producersName.values()].map(
      async (producer) => {
        const newProducer: Producer = new Producer();
        newProducer.name = producer;
        newProducer.createdAt = new Date();
        newProducer.updatedAt = new Date();

        const response = await this.addNewProducer(newProducer);
        if (response) {
          return response;
        }
        return null;
      },
    );
    const newProducers = await Promise.all(newProducersSaved);
    return newProducers.filter((p) => p != null);
  }
}
