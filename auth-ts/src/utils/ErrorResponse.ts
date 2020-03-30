class ErrorResponse extends Error {
  statusCode: number;

  message: string;

  code: number | undefined;

  value: string | undefined;

  kind: string | undefined;

  errors: Object | undefined;

  properties: Object | undefined;

  constructor(
    message: string,
    statusCode: number,
    code?: number,
    value?: string,
    kind?: string | undefined,
    errors?: Object | undefined,
    properties?: Object | undefined
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.value = value;
    this.kind = kind;
    this.errors = errors;
    this.properties = properties;
  }
}

export default ErrorResponse;
