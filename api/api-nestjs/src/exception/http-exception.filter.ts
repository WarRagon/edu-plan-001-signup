import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { ExceptionResponse } from './exception-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = exceptionResponse instanceof ExceptionResponse
      ? exceptionResponse
      : new ExceptionResponse(
          status,
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).content || '오류가 발생했습니다.'
        );

    response
      .status(status)
      .json(instanceToPlain(errorResponse));
  }
}