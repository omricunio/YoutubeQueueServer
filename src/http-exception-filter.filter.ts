import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { isArray } from 'util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const messages = [];
    if (typeof exceptionResponse === 'object') {
      const innerMessages = exceptionResponse["message"];
      if(isArray(innerMessages)) {
        messages.push(...innerMessages);
      }
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      messages,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }
}
