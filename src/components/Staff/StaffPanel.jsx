import { useNavigate, Outlet } from 'react-router';
import Navbar from '../Layout/Header/Navbar';
import { useEffect } from "react";
import Menubar from './Menubar';
import './StaffPanel.css';

const StaffPanel = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/teacher/courses');
  }, []);
  
  return (
    <div className="staff-panel">
      <Navbar />
      <Menubar />
      <main className="container main-content mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffPanel;