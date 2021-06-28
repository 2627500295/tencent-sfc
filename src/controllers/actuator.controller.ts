import { Controller, Get } from 'routing-controllers';

import { Service } from 'typedi';

import { ActuatorService } from '../services';

@Service()
@Controller()
export class DolphinController {
  protected constructor(private readonly actuatorService: ActuatorService) {}

  @Get()
  index() {
    return this.actuatorService.index();
  }

  @Get('/actuator/info')
  info() {
    return this.actuatorService.info();
  }
}
