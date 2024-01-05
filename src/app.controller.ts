import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async healthCheck(): Promise<string> {
    console.log("0000 ========");
    console.log();
    console.log("0000 ========");
    return await this.appService.healthCheck();
  }

  @Get("trigger")
  trigger() {
    console.log("0000 ========");
    console.log();
    console.log("0000 ========");
    return this.appService.trigger();
  }
}
