import { Module } from '@nestjs/common';
import { DatabaseProvider } from '@infra/modules/Database/providers/database.provider';

@Module({
  providers: [...DatabaseProvider],
  exports: [...DatabaseProvider],
})
export class DatabaseModule {}
