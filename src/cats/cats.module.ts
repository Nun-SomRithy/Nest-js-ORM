import { Module, Controller } from '@nestjs/common';
import { CatsController } from './cats.controller';
import CatsService from './cats.service';

@Module({
    controllers: [CatsController],
    providers:[CatsService]
})
export class CatsModule {}
