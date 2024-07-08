import { NextFunction, Request, Response } from "express";
import HttpException from "../../exceptions/http.exceptions";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      const errorObject = {
        error: error.message,
        statusCode: error.status,
        errors: [],
      };

      if (error.validationErrors) {
        const validationErrorArray = [];
        error.validationErrors.forEach((validationError) => {
          for (let eachError in validationError.constraints) {
            validationErrorArray.push(validationError.constraints[eachError]);
          }
        });

        errorObject.errors = validationErrorArray;
      }

      res.status(errorObject.statusCode).send(errorObject);
    } else {
      console.error(error.stack);
      res.status(500).send({ error: error.message, statusCode: 500 });
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
