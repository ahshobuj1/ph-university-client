import type {ReactNode} from 'react';

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
  // index?: boolean;
};
