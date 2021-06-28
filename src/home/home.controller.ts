import { Controller, Get } from '@nestjs/common';

import { ClientIp } from '../shared/decorators';

import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  public home() {
    return this.homeService.home();
  }

  @Get()
  public getClientIp(@ClientIp() ip: string) {
    return ip;
  }
}
