import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producer } from '@domains/Producer/models/Producer.entity';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  title: string;

  @Column('int', { nullable: false })
  year: number;

  @Column('text', { nullable: false })
  studios: string;

  @Column('boolean', { nullable: false })
  winner: boolean;

  @Column('datetime', { nullable: false })
  created_at: Date;

  @Column('datetime', { nullable: false })
  updated_at: Date;

  @ManyToMany(() => Producer)
  @JoinTable()
  producers: Producer[];

  @ManyToOne(
    () => ProducerRecorrency,
    (firstRecurrency) => firstRecurrency.firstMovie,
  )
  firstRecurrency: ProducerRecorrency[];

  @ManyToOne(
    () => ProducerRecorrency,
    (secondRecurrency) => secondRecurrency.secondMovie,
  )
  secondRecurrency: ProducerRecorrency[];
}
