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
  public static success<U extends any>(
    data: U,
    code: number = 0,
  ): HttpResponse<U> {
    return new this<U>(code, data, 'success', true);
  }

  /**
   * 失败
   *
   * @param message - 错误消息
   * @param code - 状态码
   */
  public static failure(
    message: string,
    code: number = -1,
  ): HttpResponse<null> {
    return new this<null>(code, null, message, false);
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
    public readonly success: boolean,
  ) {}
}