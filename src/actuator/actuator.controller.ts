import { Controller, Get, Request, Response } from '@nestjs/common';

import { ActuatorService } from './actuator.service';

@Controller()
export class ActuatorController {
  constructor(private readonly actuatorService: ActuatorService) {}

  @Get()
  index(
    @Request() request: Express.Request,
    @Response({ passthrough: true }) response: Express.Response
  ) {
    return this.actuatorService.index();
  }

  @Get('actuator')
  actuator() {
    return this.actuatorService.index();
  }
}
