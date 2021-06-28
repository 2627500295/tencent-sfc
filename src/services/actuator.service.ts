import { Service } from 'typedi';

import { HttpResponse } from '../helpers';

@Service()
export class ActuatorService {
  public async index() {
    return HttpResponse.success({});
  }

  public async info() {
    return HttpResponse.success({});
  }
}
