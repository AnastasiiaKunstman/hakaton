import { useSelector } from 'react-redux';
import { Store } from '../store/store.types';

export default function useAuth(): boolean {
  const user = useSelector((state: Store) => state.user.user);
  return !!(user && user.id);
}
