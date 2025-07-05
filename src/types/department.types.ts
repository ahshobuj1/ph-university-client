import type {TAcademicFaculty} from './academicFaculty';

export type TDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
};

export type TDepartmentTable = Pick<
  TDepartment,
  '_id' | 'name' | 'academicFaculty'
>;
