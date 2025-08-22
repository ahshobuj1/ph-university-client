import type {ReactNode} from 'react';

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
  icon?: ReactNode;
  // index?: boolean;
};

export const USER_ROLES = {
  SUPER_ADMIN: 'superAdmin',
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
} as const;
