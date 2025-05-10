import { DataSource } from 'typeorm';
import { Movie } from '@domains/Movie/models/Movie.entity';

export const movieProvider = [
  {
    provide: 'MOVIE_REPO',
    useFactory: (dtSource: DataSource) => dtSource.getRepository(Movie),
    inject: ['DB'],
  },
];
