import { Controller, Get } from '@nestjs/common';
import { ProducerRecorrencyService } from '@domains/Producer/services/producerRecorrency.service';
import RecorrencyTRange from '@domains/Producer/mappers/recorrency.trange';
import { ApiOkResponse } from '@nestjs/swagger';
import { RangeDto } from '@domains/Producer/dto/Range.dto';

@Controller('api/producers')
export class RecordedProducersController {
  constructor(private readonly recorrencyService: ProducerRecorrencyService) {}

  @Get('/range/wins')
  @ApiOkResponse({
    type: RangeDto,
  })
  async range(): Promise<RangeDto | null> {
    const response = await this.recorrencyService.getRangeOfWins();
    if (response && response.length > 0) {
      return RecorrencyTRange(response);
    }
    return null;
  }
}
