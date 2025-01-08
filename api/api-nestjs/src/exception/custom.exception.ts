import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionResponse } from './exception-response';

export class CustomException extends HttpException {
  constructor(statusCode: HttpStatus, content: string) {
    const response = new ExceptionResponse(statusCode, content);
    super(response, statusCode);
  }
}