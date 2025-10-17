import { Navigate, Outlet } from 'react-router-dom';

const StaffRoute = () => {
  const isAuthenticated = !!localStorage.getItem('access');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.is_superuser) {
    return <Navigate to="/admin" replace />;
  }

  if (user && !user?.is_staff) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; // Render Staff Panel Routes
};

export default StaffRoute;