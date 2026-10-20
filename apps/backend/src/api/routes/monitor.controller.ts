import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Monitor')
@Controller('/monitor')
export class MonitorController {
  @Get('/health')
  getHealth() {
    return {
      status: 'ok',
      service: 'PulseSocial Backend API',
      version: '2.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('/queue/:name')
  async getMessagesGroup(@Param('name') name: string) {
    return {
      status: 'success',
      message: `Queue ${name} is healthy.`,
    };
  }
}
