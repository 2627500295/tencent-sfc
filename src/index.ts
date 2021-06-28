import { ApiGatewayResponse, HttpResponse } from './helpers';

export async function main(event: any, context: any, callback: any) {
  // Body
  const body = event.body ? JSON.parse(event.body) : null;

  // 数据
  const data = {
    query: event.queryString,
    params: event.pathParameters,
    body,
    path: event.path,
    method: event.httpMethod,
  };

  // 结果
  const result = HttpResponse.success(data);

  // 响应
  const response = ApiGatewayResponse.json(result);

  // 回调
  if (typeof callback === 'function') {
    callback(null, response);
  }

  // 返回
  return response;
}
