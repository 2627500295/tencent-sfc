/**
 * Http 响应
 *
 * @remarks
 *
 * 统一Http响应助手类
 *
 * @public
 */
export class HttpResponse<T extends any = any> {
  /**
   * 成功
   *
   * @param data - 数据
   * @param code - 状态码
   */
  public static success<U extends any>(data: U, code = 0): HttpResponse<U> {
    return new this<U>(code, data, 'success', true);
  }

  /**
   * 失败
   *
   * @param message - 错误消息
   * @param code - 状态码
   */
  public static failure<T extends any>(
    message: string,
    code = -1,
    data: T = null
  ): HttpResponse<T> {
    return new this<T>(code, data, message, false);
  }

  /**
   * 创建 Response 状态
   *
   * @param code - 状态码
   * @param data - 数据
   * @param message - 消息
   * @param success - 成功状态
   */
  public constructor(
    public readonly code: string | number,
    public readonly data: T,
    public readonly message: string | string[],
    public readonly success: boolean
  ) {}
}
