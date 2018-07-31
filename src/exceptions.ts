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

/**
 * InvalidRouteParameterException .
 */
export class InvalidRouteParameterException extends Exception {
  constructor(details?: any, msg: string = 'Bad request') {
    super(msg, details);
    this.httpStatusCode = 400;
  }
}

/**
 * ValidationException .
 */
export class ValidationException extends Exception {
  constructor(details?: any, msg: string = 'Invalid request') {
    super(msg, details);
    this.httpStatusCode = 422;
  }
}
