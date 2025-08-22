import type {TAcademicFaculty} from './academicFaculty';
import type {TDepartment} from './department.types';

export type TFacultyRoot = {
  password?: string;
  faculty: TFaculty;
};

export type TFaculty = {
  _id: string;
  id: string; // e.g., "F-0004"
  user: string; // user._id
  email: string;
  designation: string; // e.g., "Professor"
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
    _id?: string;
  };
  academicFaculty: TAcademicFaculty; // references academicFaculty._id
  department: TDepartment; // references department._id
  gender: 'male' | 'female' | 'other'; // adjust as needed
  dateOfBirth: string; // "YYYY-MM-DD"
  contact: string;
  emergencyContact: string;
  localAddress: string;
  permanentAddress: string;
  profileImage: string;
  blood: string; // e.g., "A+"
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
