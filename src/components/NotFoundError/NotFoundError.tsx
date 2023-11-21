import './NotFoundError.css';
import { useNavigate } from 'react-router-dom';

function NotFoundError() {
  const navigate = useNavigate();

  const handleNotFClose = () => {
    // Возвращаемся к предыдущему пути
    navigate(-1);
  };

  return (
    <section className="not-found__error">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__desc">Страница не найдена</p>
      <button type="button" className="not_found__link" onClick={handleNotFClose}>Назад</button>
    </section>
  );
}

export default NotFoundError;
