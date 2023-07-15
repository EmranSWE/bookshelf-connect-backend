export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: {
    path: string;
    message: string;
  }[];
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total: number;
  };
  data: T;
};
