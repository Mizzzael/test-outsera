import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/modules/Database/database.module';
import { SeedModule } from './infra/modules/seeds/seed.module';
import { ProducerModule } from '@domains/Producer/Producer.module';
import { MovieModule } from '@domains/Movie/Movie.module';
import { ProducerRecorrencyModule } from '@domains/Producer/ProducerRecorrency.module';

@Module({
  imports: [
    DatabaseModule,
    ProducerModule,
    MovieModule,
    ProducerRecorrencyModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
