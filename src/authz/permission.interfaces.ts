import { ExecutionContext } from '@nestjs/common';

import { PermissionActionVerb, PermissionPossession } from './permission.enums';

export interface Permission {
  resource: string;
  action: PermissionActionVerb;
  possession: PermissionPossession;
  isOwn?: (ctx: ExecutionContext) => boolean;
}
