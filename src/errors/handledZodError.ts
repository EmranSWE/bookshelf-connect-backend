import { ZodError } from 'zod';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const err: IGenericErrorMessage[] = error.errors.map(err => {
    return {
      path: err?.path[err.path.length - 1].toString(),
      message: err?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: err,
  };
};

export default handleZodError;
