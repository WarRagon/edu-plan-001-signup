import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
