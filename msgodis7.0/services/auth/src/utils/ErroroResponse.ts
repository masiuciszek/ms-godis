export type ValueType = string | undefined | null | number;

class ErrorResponse extends Error {
  statusCode: number;

  value: ValueType;

  code: ValueType;

  constructor(
    message: string,
    statusCode: number,
    value?: ValueType,
    code?: ValueType
  ) {
    super(message);
    this.statusCode = statusCode;
    this.value = value;
    this.code = code;
  }
}

export default ErrorResponse;
