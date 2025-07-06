import type {TQueryParams} from '../types';

export const querySearchParams = (args: TQueryParams[]) => {
  const params = new URLSearchParams();

  if (args) {
    args.forEach((item: TQueryParams) => {
      return params.append(item.name, item.value as string);
    });

    return params;
  }
};
