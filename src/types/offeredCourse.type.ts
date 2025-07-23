import type {TAcademicFaculty} from './academicFaculty';
import type {TCourse} from './course.types';
import type {TDepartment} from './department.types';
import type {TFaculty} from './faculty.type';
import type {TSemester} from './semester.type';
import type {TSemesterRegistration} from './semesterRegistration.types';

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: TSemesterRegistration;
  semester: TSemester;
  academicFaculty: TAcademicFaculty;
  department: TDepartment;
  course: TCourse;
  faculty: TFaculty;
  maxCapacity: number;
  section: number;
  days: string[]; // e.g., ["Sun", "Mon"]
  startTime: string; // e.g., "11:00"
  endTime: string; // e.g., "12:00"
  createdAt: string;
  updatedAt: string;
};
