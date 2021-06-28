export class ApiGatewayResponse<T extends any> {
  /**
   * 是否返回 Base64
   */
  public isBase64Encoded: boolean = false;

  /**
   * 状态码
   */
  public statusCode: number = 200;

  /**
   * Headers
   */
  public headers: Record<string, string> = {};

  /**
   * 返回内容
   */
  public body: T;

  /**
   * 网关返回值
   *
   * @param body - 返回内容
   */
  constructor(body: T, statusCode: number = 200) {
    this.body = body;
    this.statusCode = statusCode;
  }

  /**
   * 设置状态码
   *
   * @param statusCode - 状态码
   *
   * @returns
   */
  public setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  /**
   * JSON 格式
   *
   * @param data - 数据
   *
   * @returns
   */
  public static json<T>(data: T) {
    const body = typeof data === 'string' ? data : JSON.stringify(data);

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Prowered-By': 'Apigw/1.0.0',
    };

    const response = new this<string>(body);

    Object.assign(response, {
      headers,
    });

    return response;
  }
}
