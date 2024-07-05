import { ValidationError } from "class-validator";

class HttpException extends Error {
  public status: number;
  public validationErrors?: ValidationError[];
  constructor(
    status: number,
    message: string,
    validationErrors?: ValidationError[]
  ) {
    super(message);
    this.status = status;
    this.validationErrors = validationErrors;
  }
}

export default HttpException;
