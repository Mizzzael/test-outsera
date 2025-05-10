import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  name: string;

  @Column('datetime', { nullable: false, name: 'updated_at' })
  updatedAt: Date;

  @Column('datetime', { nullable: false, name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ProducerRecorrency, (recurrency) => recurrency.producer)
  recurrency: ProducerRecorrency[];
}
