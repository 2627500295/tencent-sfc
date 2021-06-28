import { Controller, Get } from '@nestjs/common';
import { ActuatorService } from './actuator.service';

@Controller('actuator')
export class ActuatorController {
  constructor(private readonly actuatorService: ActuatorService) {}

  @Get()
  index() {
    return this.actuatorService.index();
  }
}
