import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const isAuthenticated = !!localStorage.getItem('access');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!user?.is_superuser) {
    return <Navigate to="/" replace />; // Redirect non-superusers to home or any page
  }

  return <Outlet />; // Render child routes
};

export default AdminRoute;