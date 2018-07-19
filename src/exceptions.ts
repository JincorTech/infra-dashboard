/**
 * Exception .
 */
export class Exception extends Error {
  public httpStatusCode: number = 500;
  constructor(public message: string, public details?: any) {
    super();
  }
}

/**
 * NotFoundException .
 */
export class NotFoundException extends Exception {
  constructor(details?: any, msg: string = 'Not found') {
    super(msg, details);
    this.httpStatusCode = 404;
  }
}
