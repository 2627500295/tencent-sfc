import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  public home() {
    return 'ok';
  }
}
