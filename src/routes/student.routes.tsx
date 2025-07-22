import ChangePassword from '../pages/auth/ChangePassword';
import StudentDashboard from '../pages/student/StudentDashboard';
import type {TUserPath} from '../types';
import {MdOutlineDashboardCustomize, MdOutlineVpnKey} from 'react-icons/md';

export const studentPaths: TUserPath[] = [
  // {
  //   index: true,
  //   element: <StudentDashboard />,
  // },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <StudentDashboard />,
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    name: 'Change Password',
    path: 'change-password',
    element: <ChangePassword />,
    icon: <MdOutlineVpnKey />,
  },
];
