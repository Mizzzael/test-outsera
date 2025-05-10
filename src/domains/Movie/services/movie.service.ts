import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '@domains/Movie/models/Movie.entity';
import { Producer } from '@domains/Producer/models/Producer.entity';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_REPO')
    private repository: Repository<Movie>,
  ) {}

  public addMovie(movie: Movie): Promise<Movie> {
    return this.repository.save(movie);
  }

  public async findOne(id: number): Promise<Movie | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByTitle(title: string): Promise<Movie | null> {
    return this.repository.findOne({
      where: {
        title: title,
      },
    });
  }

  public async updateMovieProducers(
    id: number,
    movieProducers: Producer[],
  ): Promise<Movie | null> {
    const movie = await this.findOne(id);
    if (!movie) {
      return null;
    }

    movie.producers = movieProducers;
    movie.updated_at = new Date();
    await this.repository.save(movie);
    return movie;
  }
}
