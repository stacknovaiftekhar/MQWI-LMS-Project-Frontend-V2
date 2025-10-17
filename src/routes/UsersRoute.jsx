import { Navigate, Outlet } from 'react-router-dom';

const UsersRoute = () => {
  const isAuthenticated = !!localStorage.getItem('access');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.is_superuser) {
    return <Navigate to="/admin" replace />;
  }

  if (user?.is_staff) {
    return <Navigate to="/teacher" replace />;
  }

  return <Outlet />; // Render User Panel Routes
};

export default UsersRoute;