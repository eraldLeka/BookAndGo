import { Module } from '@nestjs/common';
import { PenaltyService } from './penalty.service';

@Module({
  providers: [PenaltyService]
})
export class PenaltyModule {}
