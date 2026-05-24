import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { currentUser, userRole, loading } = useAuth();

  // Поки йде перевірка авторизації, показуємо спінер або порожній екран
  if (loading) {
    return <div className="text-center py-5">Завантаження...</div>;
  }

  // Якщо користувач не залогінений — відправляємо на вхід
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Якщо вказана роль (наприклад, 'student') і вона не збігається — відправляємо на головну
  if (role === 'teacher' && userRole !== 'teacher') {
    return <Navigate to="/" />;
  }

  if (role === 'student' && userRole && userRole !== 'student') {
    return <Navigate to="/" />;
  }

  // Якщо все ок — показуємо сторінку
  return children;
};

export default PrivateRoute;
