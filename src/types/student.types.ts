import type {TAcademicFaculty} from './academicFaculty';
import type {TDepartment} from './department.types';
import type {TSemester} from './semester.type';

export type TStudentRoot = {
  password?: string;
  student: TStudent;
};

export type TStudent = {
  _id: string;
  id: string;
  name: Name;
  age: number;
  semester: TSemester;
  department: TDepartment;
  academicFaculty: TAcademicFaculty;
  email: string;
  contact: string;
  fatherName: string;
  motherName: string;
  fatherContact: string;
  matherContact: string;
  gender: string;
  blood?: string;
  profileImage: string;
  permanentAddress: PermanentAddress;
  localAddress: LocalAddress;
  isDeleted?: boolean;
};

export interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface PermanentAddress {
  village?: string;
  postOffice: string;
  policeStation: string;
  town: string;
}

export interface LocalAddress {
  village?: string;
  postOffice: string;
  policeStation: string;
  town: string;
}
