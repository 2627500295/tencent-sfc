import { SetMetadata, ExecutionContext } from '@nestjs/common';

import { PERMISSIONS_METADATA } from './permission.constants';

import { Permission } from './permission.interfaces';

function defaultIsOwn(ctx: ExecutionContext) {
  return false;
}

/**
 * You can define multiple permissions, but only
 * when all of them satisfied, could you access the route.
 */
export const UsePermissions = (...permissions: Permission[]) => {
  const perms = permissions.map((item) => {
    item.isOwn ??= defaultIsOwn;
    return item;
  });

  return SetMetadata(PERMISSIONS_METADATA, perms);
};
