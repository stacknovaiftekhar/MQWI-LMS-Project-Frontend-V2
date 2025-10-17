import { Outlet } from 'react-router';
import Navbar from '../Layout/Header/Navbar';
import Sidebar from './Sidebar';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <div className="admin-panel">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminPanel;