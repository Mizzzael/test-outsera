import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/modules/Database/database.module';
import { seedProviders } from '@infra/modules/seeds/provider/seed.provider';
import { SeedService } from '@infra/modules/seeds/services/seed.service';
import { ProducerModule } from '@domains/Producer/Producer.module';
import { MovieModule } from '@domains/Movie/Movie.module';
import { ProducerRecorrencyModule } from '@domains/Producer/ProducerRecorrency.module';
import { RecordedProducersController } from '@domains/Producer/controllers/Recorrency.controller';

@Module({
  imports: [
    DatabaseModule,
    ProducerModule,
    MovieModule,
    ProducerRecorrencyModule,
  ],
  providers: [...seedProviders, SeedService],
  controllers: [RecordedProducersController],
})
export class SeedModule {}
