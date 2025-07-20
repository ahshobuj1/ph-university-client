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
import {MdOutlineDashboardCustomize, MdCastForEducation} from 'react-icons/md';
import {
  PiStudentBold,
  PiBookOpenUserBold,
  PiUserListFill,
  PiCashRegisterFill,
} from 'react-icons/pi';
import {FaUserTie} from 'react-icons/fa6';
import {HiOutlineAcademicCap} from 'react-icons/hi';
import {LiaUsersSolid} from 'react-icons/lia';
import {BsBuildingsFill, BsBuildings} from 'react-icons/bs';
import {MdOutlineHourglassEmpty} from 'react-icons/md';
import {GiArchiveRegister} from 'react-icons/gi';
import {FaUsersCog} from 'react-icons/fa';

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
    icon: <PiBookOpenUserBold />,
    // icon: <GiArchiveRegister />,
    children: [
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />,
        icon: <MdCastForEducation />,
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
        icon: <MdOutlineHourglassEmpty />,
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
        icon: <PiCashRegisterFill />,
      },
    ],
  },
];

// * hard coded Admin sidebar
// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     // console.log(acc, item);

//     if (item.name && item.path) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}> {item.name} </NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

// * hard coded AdminRoutes
// export const adminRoutes = adminPaths.reduce((acc: TRoutes[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);

// export const adminPaths: TUserPath[] = [
//   // {
//   //   index: true,
//   //   element: <AdminDashboard />,
//   // },
//   {
//     name: 'Dashboard',
//     path: 'dashboard',
//     element: <AdminDashboard />,
//     icon: <UsergroupAddOutlined />,
//   },
//   {
//     name: 'User-Management',
//     icon: <UsergroupAddOutlined />,
//     children: [
//       {
//         name: 'Create-Student',
//         path: 'create-student',
//         element: <CreateStudent />,
//       },
//       {
//         name: 'Create-Faculty',
//         path: 'create-faculty',
//         element: <CreateFaculty />,
//       },
//     ],
//   },
//   {
//     name: 'Academic-Management',
//     children: [
//       {
//         name: 'Academic Faculty',
//         path: 'academic-faculty',
//         element: <AcademicFaculty />,
//       },

//       {
//         name: 'Create A. Faculty',
//         path: 'create-academic-faculty',
//         element: <CreateAcademicFaculty />,
//       },
//       {
//         name: 'Department',
//         path: 'department',
//         element: <Department />,
//       },
//       {
//         name: 'Create-Department',
//         path: 'create-department',
//         element: <CreateDepartment />,
//       },
//       {
//         name: 'Semester',
//         path: 'semester',
//         element: <Semester />,
//       },
//       {
//         name: 'Create-Semester',
//         path: 'create-semester',
//         element: <CreateSemester />,
//       },
//       {
//         name: 'Semester Registration',
//         path: 'semester-registration',
//         element: <SemesterRegistration />,
//       },
//     ],
//   },
// ];
