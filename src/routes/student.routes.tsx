import StudentDashboard from '../pages/student/StudentDashboard';
import type {TUserPath} from '../types';

export const studentPaths: TUserPath[] = [
  // {
  //   index: true,
  //   element: <StudentDashboard />,
  // },
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <StudentDashboard />,
  },
];
