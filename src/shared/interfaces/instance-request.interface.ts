import type { Request } from 'express';

export type InstanceRequest = Request & {
  __EVENT__?: any;
  __CONTEXT__?: any;
};
