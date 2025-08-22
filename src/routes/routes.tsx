import {createBrowserRouter, Navigate} from 'react-router-dom';
import App from '../App';

import routesGenerator from '../utils/routesGenerator';
import {adminPaths} from './admin.routes';
import {facultyPaths} from './faculty.routes';
import {studentPaths} from './student.routes';
import Login from '../pages/auth/Login';
import ProtectedRoutes from './ProtectedRoutes';
import {USER_ROLES} from '../types';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoutes allowedRole={USER_ROLES.ADMIN}>
        <App />
      </ProtectedRoutes>
    ),
    children: routesGenerator(adminPaths),
  },

  {
    path: '/faculty',
    element: (
      <ProtectedRoutes allowedRole={USER_ROLES.FACULTY}>
        <App />
      </ProtectedRoutes>
    ),
    children: routesGenerator(facultyPaths),
  },

  {
    path: '/student',
    element: (
      <ProtectedRoutes allowedRole={USER_ROLES.STUDENT}>
        <App />
      </ProtectedRoutes>
    ),
    children: routesGenerator(studentPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
