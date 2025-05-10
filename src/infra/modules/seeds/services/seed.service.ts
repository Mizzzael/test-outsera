import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SeedEntity } from '@infra/modules/seeds/model/Seed.entity';
import getSeeds from '@/src/commons/helpers/getSeeds';
import getDataFromCsv from '@/src/commons/helpers/getData';
import { ProducerService } from '@domains/Producer/services/producer.service';
import { Producer } from '@domains/Producer/models/Producer.entity';
import { MovieService } from '@domains/Movie/services/movie.service';
import { Movie } from '@domains/Movie/models/Movie.entity';
import { ProducerRecorrencyService } from '@domains/Producer/services/producerRecorrency.service';
import { ProducerRecorrency } from '@domains/Producer/models/ProducerRecorrency.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @Inject('SEED_REPO')
    private repository: Repository<SeedEntity>,
    private readonly producerService: ProducerService,
    private readonly movieService: MovieService,
    private readonly recorrencyService: ProducerRecorrencyService,
  ) {}

  async add(seed: SeedEntity): Promise<SeedEntity> {
    return this.repository.save(seed);
  }

  async onModuleInit(): Promise<void> {
    const files = getSeeds();
    await Promise.all(files.map((file) => this.processSeeds(file)));
  }

  private async processSeeds(file: string): Promise<void> {
    const seedsSaved = await this.findOneSeed(file);
    if (!seedsSaved) {
      const seed = new SeedEntity();
      seed.isProcessed = true;
      seed.createdAt = new Date();
      seed.updatedAt = new Date();
      seed.fileName = file;
      await this.add(seed);

      const data = await getDataFromCsv(file);
      const producers: Set<string> = new Set(
        data.map(({ producer }) => producer.trim()),
      );

      const savedProducers =
        await this.producerService.saveMultiplesProducers(producers);
      for (const moviedata of data) {
        const { producer, movies, winsInterval } = moviedata;
        let currentProducer: Producer | null = null;
        if (savedProducers.length > 0) {
          currentProducer = savedProducers.filter(({ name }) => name === producer)[0];
        }

        if (!currentProducer) {
          currentProducer =
            await this.producerService.getProducerByName(producer);
        }

        if (!currentProducer) continue;

        const listMovie: Movie[] = [];

        for (const movie of movies) {
          let movieData: Movie | null = await this.movieService.findByTitle(
            movie.title,
          );
          if (movieData === null) {
            const newMovie: Movie = new Movie();
            newMovie.title = movie.title;
            newMovie.updated_at = new Date();
            newMovie.created_at = new Date();
            newMovie.winner = movie.winner;
            newMovie.producers = [currentProducer];
            newMovie.year = movie.year;
            newMovie.studios = movie.studios;
            movieData = await this.movieService.addMovie(newMovie);
          } else if (movieData) {
            const movieProducers: Producer[] = movieData.producers || [];
            const producerAlreadyInMovie =
              (movieProducers || []).filter(
                ({ id: producerId }) => currentProducer?.id === producerId,
              ).length > 0;

            if (!producerAlreadyInMovie) {
              movieProducers.push(currentProducer);
              movieData = await this.movieService.updateMovieProducers(
                movieData.id,
                movieProducers,
              );
            }
          }

          if (movieData) listMovie.push(movieData);
        }

        if (winsInterval && winsInterval?.length > 0) {
          for (const win of winsInterval) {
            const newRecorrency = new ProducerRecorrency();
            newRecorrency.producer = currentProducer;
            newRecorrency.yearBegin = win.yearBegin;
            newRecorrency.yearEnd = win.yearEnd;
            newRecorrency.interval = win.interval;

            let firstMovie: Movie | null = listMovie.filter(
              ({ title }) => title == win.firstMovie.title,
            )[0];

            let secondMovie: Movie | null = listMovie.filter(
              ({ title }) => title == win.secondMovie.title,
            )[0];

            if (!firstMovie) {
              firstMovie = await this.movieService.findByTitle(
                win.firstMovie.title,
              );
            }

            if (!secondMovie) {
              secondMovie = await this.movieService.findByTitle(
                win.secondMovie.title,
              );
            }

            if (!firstMovie || !secondMovie) {
              continue;
            }

            newRecorrency.firstMovie = firstMovie;
            newRecorrency.secondMovie = secondMovie;

            await this.recorrencyService.save(newRecorrency);
          }
        }
      }
    }
  }

  async findOneSeed(seedName: string): Promise<SeedEntity | null> {
    return this.repository.findOne({
      where: {
        fileName: seedName,
      },
    });
  }
}
