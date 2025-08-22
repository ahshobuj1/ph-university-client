type TApiErrorData = {
  message?: string;
};

type TApiError = {
  data?: TApiErrorData;
  message?: string;
  errorSource?: unknown;
};

export const getErrorMessage = (err: unknown): string => {
  if (err && typeof err === 'object') {
    const apiErr = err as TApiError;

    if (apiErr?.data?.message) return String(apiErr.data.message);
    if (apiErr?.message) return String(apiErr.message);
  }
  return 'Something went wrong...!';
};
