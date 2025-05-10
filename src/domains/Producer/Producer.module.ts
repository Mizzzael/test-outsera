import { DatabaseModule } from '@infra/modules/Database/database.module';
import { producerProvider } from '@domains/Producer/providers/producer.provider';
import { Module } from '@nestjs/common';
import { ProducerService } from '@domains/Producer/services/producer.service';

@Module({
  imports: [DatabaseModule],
  providers: [...producerProvider, ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
