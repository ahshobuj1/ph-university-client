import AdminDashboard from '../pages/admin/AdminDashboard';
import type {TUserPath} from '../types';
import Semester from '../pages/admin/academicManagement/semester/Semester';
import CreateStudent from '../pages/admin/userManagement/student/CreateStudent';
import CreateFaculty from '../pages/admin/userManagement/faculty/CreateFaculty';
import CreateSemester from '../pages/admin/academicManagement/semester/CreateSemester';
import CreateDepartment from '../pages/admin/academicManagement/department/CreateDepartment';
import CreateAcademicFaculty from '../pages/admin/academicManagement/academicFaculty/CreateAcademicFaculty';
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
import ChangePassword from '../components/shared/ChangePassword/ChangePassword';
import Course from '../pages/admin/academicManagement/course/Course';
import OfferedCourse from '../pages/admin/academicManagement/offeredCourse/OfferedCourse';
import EnrolledCourse from '../pages/admin/academicManagement/enrolledCourse/EnrolledCourse';

export const adminPaths: TUserPath[] = [
  // {
  //   index: true,
  //   element: <AdminDashboard />,
  // },
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
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />,
        icon: <PiStudentBold />,
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
        icon: <FaUserTie />,
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
        name: 'Create A. Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty />,
      },
      {
        name: 'Department',
        path: 'department',
        element: <Department />,
        icon: <BsBuildings />,
      },
      {
        name: 'Create-Department',
        path: 'create-department',
        element: <CreateDepartment />,
      },
      {
        name: 'Semester',
        path: 'semester',
        element: <Semester />,
        icon: <FaRegCalendarAlt />,
      },
      {
        name: 'Create-Semester',
        path: 'create-semester',
        element: <CreateSemester />,
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
