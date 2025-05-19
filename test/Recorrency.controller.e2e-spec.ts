import { Test, TestingModule } from '@nestjs/testing';
import { RecordedProducersController } from '@domains/Producer/controllers/Recorrency.controller';
import { TRangeBase } from '@domains/Producer/schemes/TRange';
import { DatabaseModule } from '@infra/modules/Database/database.module';
import { ProducerModule } from '@domains/Producer/Producer.module';
import { MovieModule } from '@domains/Movie/Movie.module';
import { ProducerRecorrencyModule } from '@domains/Producer/ProducerRecorrency.module';
import { SeedModule } from '@infra/modules/seeds/seed.module';

describe('Recorrency Controller Spec', () => {
  let appController: RecordedProducersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ProducerModule,
        MovieModule,
        ProducerRecorrencyModule,
        SeedModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    appController = app.get<RecordedProducersController>(
      RecordedProducersController,
    );
  });

  describe('Methods', () => {
    it('check result of api of max-min"', async () => {
      const response = await appController.range();
      if (response) {
        const validation = TRangeBase.safeParse(response);
        expect(validation.success).toBe(true);
      } else {
        expect(response).toBeNull();
      }
    });
  });
});
