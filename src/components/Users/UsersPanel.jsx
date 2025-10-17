import { useNavigate, Outlet } from 'react-router';
import Navbar from '../Layout/Header/Navbar';
import { useEffect } from "react";
import Menubar from './Menubar';
import './UsersPanel.css';

const UsersPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
      navigate('/dashboard/courses');
  }, []);

  return (
    <div className="users-panel">
      <Navbar />
      <Menubar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UsersPanel;