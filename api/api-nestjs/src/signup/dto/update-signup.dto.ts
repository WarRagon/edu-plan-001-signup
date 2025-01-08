import { PartialType } from '@nestjs/swagger';
import { CreateSignupDto } from './create-signup.dto';

export class UpdateSignupDto extends PartialType(CreateSignupDto) {}
