import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

function ProtectedRoute({ element: Component, ...props }: any) {
  const { user } = useAppSelector((state) => state.auth);

  return user ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
