export type TData = {
  data: Record<string, unknown>;
};

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources?: [{path: string; message: string}];
    stack?: null | string;
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse = {
  data?: TData;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};
