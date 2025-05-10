import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/modules/Database/database.module';
import { movieProvider } from '@domains/Movie/providers/movie.provider';
import { MovieService } from '@domains/Movie/services/movie.service';

@Module({
  imports: [DatabaseModule],
  providers: [...movieProvider, MovieService],
  exports: [MovieService],
})
export class MovieModule {}
