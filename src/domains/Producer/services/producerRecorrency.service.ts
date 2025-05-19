import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';

@Injectable()
export class ProducerRecorrencyService {
  constructor(
    @Inject('PRODUCER_RECORRENCY_REPO')
    private repositore: Repository<ProducerRecorrency>,
  ) {}

  public async save(
    recorrency: ProducerRecorrency,
  ): Promise<ProducerRecorrency | null> {
    const alreadyExists = await this.checkIfRecorrencyAlreadyExist(
      recorrency.yearBegin,
      recorrency.yearEnd,
    );
    if (alreadyExists) {
      return null;
    }
    return this.repositore.save(recorrency);
  }

  public async checkIfRecorrencyAlreadyExist(
    yb: number,
    ye: number,
  ): Promise<boolean> {
    const recorrency = await this.repositore.count({
      where: {
        yearBegin: yb,
        yearEnd: ye,
      },
    });
    return recorrency > 0;
  }

  public async getTotal(): Promise<number> {
    const total = await this.repositore.count();
    return total;
  }

  public async getRangeOfWins(): Promise<ProducerRecorrency[][] | null> {
    let response: ProducerRecorrency[][] | null = null;
    const total = await this.getTotal();
    if (total < 2) return null;
    const max = await this.repositore.find({
      take: 1,
      order: {
        interval: 'DESC',
        yearBegin: 'DESC',
      },
      relations: ['producer', 'firstMovie', 'secondMovie'],
    });

    const min = await this.repositore.find({
      take: 1,
      order: {
        interval: 'ASC',
        yearBegin: 'DESC',
      },
      relations: ['producer', 'firstMovie', 'secondMovie'],
    });
    response = [max, min];
    return response;
  }
}
