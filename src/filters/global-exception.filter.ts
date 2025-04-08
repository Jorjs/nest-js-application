import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalHttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // If it's a known HttpException, just use Nest's status code & response
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // Typically, this is a string or object. Nest's default would do this for you,
      // but if you want to unify the shape, parse it here.
      this.logger.error(`HttpException thrown: `, exception.stack);

      response.status(status).json({
        statusCode: status,
        message: exceptionResponse,
      });
    } 
    // Otherwise, handle it as an internal server error
    else {
      this.logger.error(`Unknown exception thrown:`, exception);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
