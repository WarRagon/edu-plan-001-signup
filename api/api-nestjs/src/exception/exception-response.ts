import { Expose } from 'class-transformer';

export class ExceptionResponse {
  @Expose({ name: 'status_code' })
  statusCode: number;

  content: string;

  constructor(statusCode: number, content: string) {
    this.statusCode = statusCode;
    this.content = content;
  }
}