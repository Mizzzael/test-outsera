import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producer } from '@domains/Producer/models/Producer.entity';
import { Movie } from '@domains/Movie/models/Movie.entity';

@Entity()
export class ProducerRecorrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  interval: number;

  @Column('int')
  yearBegin: number;

  @Column('int')
  yearEnd: number;

  @ManyToOne(() => Producer, (producer) => producer.recurrency)
  producer: Producer;

  @ManyToOne(() => Movie, (firstMovie) => firstMovie.firstRecurrency)
  firstMovie: Movie;

  @ManyToOne(() => Movie, (secondMovie) => secondMovie.secondRecurrency)
  secondMovie: Movie;
}
