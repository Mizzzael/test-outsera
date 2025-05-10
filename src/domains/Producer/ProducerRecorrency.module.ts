import { Module } from '@nestjs/common';
import { producerRecorrencyProvider } from '@domains/Producer/providers/producerRecorrency.provider';
import { DatabaseModule } from '@infra/modules/Database/database.module';
import { ProducerRecorrencyService } from '@domains/Producer/services/producerRecorrency.service';

@Module({
  imports: [DatabaseModule],
  providers: [...producerRecorrencyProvider, ProducerRecorrencyService],
  exports: [ProducerRecorrencyService],
})
export class ProducerRecorrencyModule {}
