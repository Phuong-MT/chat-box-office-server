import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  severHello() {
    return 'server on ...';
  }
}
