import type {ReactNode} from 'react';
import {useAppSelector} from '../redux/hooks';
import {Navigate} from 'react-router-dom';

const ProtectedRoutes = ({children}: {children: ReactNode}) => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default ProtectedRoutes;
