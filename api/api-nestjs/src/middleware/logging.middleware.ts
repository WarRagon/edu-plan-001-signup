import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      console.log(`Response: ${res.statusCode}`);
    });
    next();
  }
}
