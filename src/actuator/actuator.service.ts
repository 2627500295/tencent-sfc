import { Injectable } from '@nestjs/common';

import { HttpResponse } from '../shared/helpers';

@Injectable()
export class ActuatorService {
  public index() {
    return HttpResponse.success('ok');
  }
}
