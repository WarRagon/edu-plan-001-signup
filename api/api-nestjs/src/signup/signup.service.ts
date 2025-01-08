import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import * as crypto from 'crypto';
import { SuccessResponse } from '../response/success-response';
import { CustomException } from 'src/exception/custom.exception';

@Injectable()
export class SignupService {
  private usersDb: Record<string, string> = {};

  signup(data: CreateSignupDto): { statusCode: number; content: string } {
    const { id, password } = data;

    if (this.usersDb[id]) {
      throw new CustomException(
        HttpStatus.CONFLICT,
        '이미 사용 중인 ID입니다.'
      );
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    this.usersDb[id] = hashedPassword;

    const response = new SuccessResponse(HttpStatus.CREATED, '회원가입 성공');
    return response
  }


  create(createSignupDto: CreateSignupDto) {
    return 'This action adds a new signup';
  }

  findAll() {
    return `This action returns all signup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signup`;
  }

  update(id: number, updateSignupDto: UpdateSignupDto) {
    return `This action updates a #${id} signup`;
  }

  remove(id: number) {
    return `This action removes a #${id} signup`;
  }
}
