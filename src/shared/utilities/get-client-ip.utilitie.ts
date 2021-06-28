export function getClientIp(request: any): string {
  if (request?.__EVENT__?.requestContext?.sourceIp) {
    return request.__EVENT__.requestContext.sourceIp;
  }

  if (request.ip) {
    return request.ip;
  }

  if (request.clientIp) {
    return request.clientIp;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require('request-ip').getClientIp(request);
}
