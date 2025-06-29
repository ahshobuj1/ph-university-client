import type {ReactNode} from 'react';
import {useAppSelector} from '../redux/hooks';
import {Navigate} from 'react-router-dom';

const ProtectedRoutes = ({children}: {children: ReactNode}) => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default ProtectedRoutes;
