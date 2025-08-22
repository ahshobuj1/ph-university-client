import AdminDashboard from '../pages/admin/AdminDashboard';
import type {TUserPath} from '../types';
import Semester from '../pages/admin/academicManagement/semester/Semester';
import CreateFaculty from '../pages/admin/userManagement/faculty/CreateFaculty';
import Department from '../pages/admin/academicManagement/department/Department';
import AcademicFaculty from '../pages/admin/academicManagement/academicFaculty/AcademicFaculty';
import SemesterRegistration from '../pages/admin/academicManagement/SemesterRegistration/SemesterRegistration';
import {
  MdOutlineDashboardCustomize,
  MdOutlineVpnKey,
  MdOutlineMenuBook,
} from 'react-icons/md';
import {PiStudentBold} from 'react-icons/pi';
import {FaUserTie, FaPlus} from 'react-icons/fa6';
import {LiaUsersSolid, LiaChalkboardTeacherSolid} from 'react-icons/lia';
import {BsBuildings} from 'react-icons/bs';
import {FaBolt, FaRegCalendarAlt, FaUniversity} from 'react-icons/fa';
import {GiNotebook} from 'react-icons/gi';
import {IoMdDoneAll} from 'react-icons/io';
import ChangePassword from '../pages/auth/ChangePassword';
import Course from '../pages/admin/academicManagement/course/Course';
import OfferedCourse from '../pages/admin/academicManagement/offeredCourse/OfferedCourse';
import EnrolledCourse from '../pages/admin/academicManagement/enrolledCourse/EnrolledCourse';
import StudentManagement from '../pages/admin/userManagement/student/StudentManagement';
import CreateStudent from '../pages/admin/userManagement/student/CreateStudent';
import FacultyManagement from '../pages/admin/userManagement/faculty/FacultyManagement';

export const adminPaths: TUserPath[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    name: 'User Management',
    icon: <LiaUsersSolid />,
    children: [
      {
        name: 'Students',
        path: 'students',
        element: <StudentManagement />,
        icon: <PiStudentBold />,
      },
      {
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        name: 'Faculties',
        path: 'faculties',
        element: <FacultyManagement />,
        icon: <FaUserTie />,
      },
      {
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
    ],
  },
  {
    name: 'Academic Management',
    icon: <MdOutlineMenuBook />,
    // icon: <GiArchiveRegister />,
    children: [
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />,
        icon: <FaUniversity />,
      },
      {
        name: 'Department',
        path: 'department',
        element: <Department />,
        icon: <BsBuildings />,
      },
      {
        name: 'Semester',
        path: 'semester',
        element: <Semester />,
        icon: <FaRegCalendarAlt />,
      },
      {
        name: 'Semester Registration',
        path: 'semester-registration',
        element: <SemesterRegistration />,
        icon: <GiNotebook />,
      },
    ],
  },
  {
    name: 'Course Management',
    icon: <FaBolt />,
    // icon: <GiArchiveRegister />,
    children: [
      {
        name: 'Course',
        path: 'course',
        element: <Course />,
        icon: <LiaChalkboardTeacherSolid />,
      },

      {
        name: 'Offered Course',
        path: 'offered-course',
        element: <OfferedCourse />,
        icon: <IoMdDoneAll />,
      },
      {
        name: 'Enrolled Course',
        path: 'enrolled-course',
        element: <EnrolledCourse />,
        icon: <FaPlus />,
      },
    ],
  },
  {
    name: 'Change Password',
    path: 'change-password',
    element: <ChangePassword />,
    icon: <MdOutlineVpnKey />,
  },
];
