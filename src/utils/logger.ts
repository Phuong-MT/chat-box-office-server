import { LoggerService, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  private readonly logger = new Logger(MyLogger.name, { timestamp: true });
  log(message: string) {
    this.logger.log(`${message}`);
  }

  error(message: string, trace?: string) {
    this.logger.error(`[ERROR] ${message}`, trace);
  }

  warn(message: string) {
    this.logger.warn(`[WARN] ${message}`);
  }

  debug?(message: string) {
    this.logger.debug(`[DEBUG] ${message}`);
  }
}
