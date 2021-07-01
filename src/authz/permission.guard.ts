import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { PERMISSIONS_METADATA } from './permission.constants';

import { Permission } from './permission.interfaces';

import { PermissionPossession } from './permission.enums';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // 获取权限列表
      const permissions = this.reflector.get<Required<Permission>[]>(
        PERMISSIONS_METADATA,
        context.getHandler()
      );

      // 不存在权限列表
      if (!permissions) {
        return true;
      }

      // 获取请求
      const request = context
        .switchToHttp()
        .getRequest<Request & { user: any }>();

      // 获取用户
      const user = request.user;

      // 不存在用户
      if (!user) {
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
          code: 'UNAUTHORIZED',
        });
      }

      const hasPermission = async (
        user: any,
        permission: Required<Permission>
      ): Promise<boolean> => {
        const { possession, resource, action } = permission;

        const possessions = [];

        if (possession === PermissionPossession.OWN_ANY) {
          possessions.push(PermissionPossession.ANY, PermissionPossession.OWN);
        } else {
          possessions.push(possession);
        }

        return PermissionGuard.asyncSome<PermissionPossession>(
          possessions,
          async (possession) => {
            if (possession === PermissionPossession.OWN) {
              return permission.isOwn(context);
            } else {
              // return this.enforcer.enforce(user, resource, `${action}:${possession}`);
            }
          }
        );
      };

      const result = await PermissionGuard.asyncEvery(
        permissions,
        async (permission) => hasPermission(user, permission)
      );

      return result;
    } catch (e) {
      throw e;
    }
  }

  static async asyncSome<T>(
    array: T[],
    callback: (value: T, index: number, a: T[]) => Promise<boolean>
  ): Promise<boolean> {
    for (let i = 0; i < array.length; i++) {
      const result = await callback(array[i], i, array);

      if (result) {
        return result;
      }
    }

    return false;
  }

  static async asyncEvery<T>(
    array: T[],
    callback: (value: T, index: number, a: T[]) => Promise<boolean>
  ): Promise<boolean> {
    for (let i = 0; i < array.length; i++) {
      const result = await callback(array[i], i, array);

      if (!result) {
        return result;
      }
    }

    return true;
  }
}
