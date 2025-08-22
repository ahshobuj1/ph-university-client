import type {ReactNode} from 'react';
import {useAppSelector} from '../redux/hooks';
import {Navigate} from 'react-router-dom';

interface IProtectedRoutesProps {
  children: ReactNode;
  allowedRole: string;
}

const ProtectedRoutes = ({children, allowedRole}: IProtectedRoutesProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  if (!token || !user) {
    return <Navigate to={'/login'} replace />;
  }

  //* Role checking
  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoutes;
