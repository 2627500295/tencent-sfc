import { Injectable } from '@nestjs/common';

import { HttpResponse } from '../lib/helpers';

@Injectable()
export class ActuatorService {
  public index() {
    return HttpResponse.success('ok');
  }
}
