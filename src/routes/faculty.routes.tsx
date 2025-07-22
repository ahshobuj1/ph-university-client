import ChangePassword from '../pages/auth/ChangePassword';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import type {TUserPath} from '../types';
import {MdOutlineDashboardCustomize, MdOutlineVpnKey} from 'react-icons/md';
export const facultyPaths: TUserPath[] = [
  // {
  //   index: true,
  //   element: <FacultyDashboard />,
  // },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <FacultyDashboard />,
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    name: 'Change Password',
    path: 'change-password',
    element: <ChangePassword />,
    icon: <MdOutlineVpnKey />,
  },
];
