import { useSelector } from 'react-redux';
import { Store } from '../../store/store.types';

export default function Home() {
  const user = useSelector((store: Store) => store.user.user);

  return (
    <h1>
      Вы вошли в систему
      {user.first_name}
      {' '}
      {user.email}
    </h1>
  );
}
