import type {TAcademicFaculty} from './academicFaculty';
import type {TCourse} from './course.types';
import type {TDepartment} from './department.types';
import type {TFaculty} from './faculty.type';
import type {TSemester} from './semester.type';
import type {TSemesterRegistration} from './semesterRegistration.types';
import type {TStudent} from './student.types';

export type TEnrolledCourse = {
  _id: string;
  semesterRegistration: TSemesterRegistration;
  semester: TSemester;
  academicFaculty: TAcademicFaculty;
  department: TDepartment;
  course: TCourse;
  faculty: TFaculty;
  student: TStudent;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  isEnrolled?: boolean;
  courseMarks?: TCourseMarks;
  grade?: string;
  gradePoints?: number;
  isCompleted?: boolean;
  createdAt: string;
  updatedAt: string;
};

type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};
