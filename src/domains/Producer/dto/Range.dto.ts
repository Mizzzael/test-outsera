import { createZodDto } from 'nestjs-zod';
import { TRangeBase } from '@domains/Producer/schemes/TRange';

export class RangeDto extends createZodDto(TRangeBase) {}
