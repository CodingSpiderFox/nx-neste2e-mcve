import { Body, Controller, Delete, Get, Logger, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    Logger.log('Get data');
    return this.appService.getData();
  }

  @Post()
  async addData(@Body() data: { message: string }) {
    Logger.log(`Post ${data}`);
    await this.appService.addData(data);
  }

  @Delete()
  async deleteAllData() {
    Logger.log('Delete data');
    await this.appService.deleteAll();
  }
}
