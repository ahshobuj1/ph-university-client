import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';
import {adminRoutes} from './admin.routes';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <App />,
    children: adminRoutes,
  },

  {
    path: '/faculty',
    element: <App />,
    children: [
      {
        index: true,
        element: <FacultyDashboard />,
      },
      {
        path: 'dashboard',
        element: <FacultyDashboard />,
      },
    ],
  },

  {
    path: '/student',
    element: <App />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: 'dashboard',
        element: <StudentDashboard />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
