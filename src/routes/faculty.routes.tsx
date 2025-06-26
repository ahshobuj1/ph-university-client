import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import type {TUserPath} from '../types';

export const facultyPaths: TUserPath[] = [
  // {
  //   index: true,
  //   element: <FacultyDashboard />,
  // },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <FacultyDashboard />,
  },
];
