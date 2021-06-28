import serverlessHttp from 'serverless-http';

import type { APIGatewayEvent, APIGatewayProxyEventV2, Context } from 'aws-lambda';

import { bootstrap } from './main';

export async function main(event: APIGatewayEvent | APIGatewayProxyEventV2, context: Context) {
  // 获取实例
  const instance = await bootstrap();

  // Severless Http
  return serverlessHttp(instance)(event, context);
}

