import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

function ProtectedRoute({ element: Component, ...props }: any) {
  const { user } = useAppSelector((state) => state.auth);

  return user ? <Component {...props} /> : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
