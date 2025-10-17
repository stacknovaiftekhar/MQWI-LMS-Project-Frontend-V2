import { FaChalkboardTeacher, FaUserGraduate, FaThList, FaBook, FaUserPlus, FaMoneyBillAlt, FaWallet, FaAddressBook,
  FaEnvelope, FaHandHoldingHeart, FaSignOutAlt, FaAngleDoubleRight, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import { useState } from 'react';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { name: 'Teachers', path: 'teachers', icon: <FaChalkboardTeacher /> },
    { name: 'Students', path: 'students', icon: <FaUserGraduate /> },
    { name: 'Category', path: 'category', icon: <FaThList /> },
    { name: 'Courses',  path: 'courses',  icon: <FaBook /> },
    { name: 'Enrolls',  path: 'enrolls',  icon: <FaUserPlus /> },
    { name: 'Payments', path: 'payments', icon: <FaMoneyBillAlt /> },
    { name: 'Accounts', path: 'accounts', icon: <FaWallet /> },
    { name: 'Contacts', path: 'contacts', icon: <FaAddressBook /> },
    { name: 'Messages', path: 'messages', icon: <FaEnvelope /> },
    { name: 'Sadaqah',  path: 'sadaqah',  icon: <FaHandHoldingHeart /> },
    { name: 'Logout',   path: 'signout',  icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-btn text-warning">
          {isCollapsed ? <FaAngleDoubleRight /> : <FaBars />}
        </button>
        {!isCollapsed && <Link to="/admin" className="admin-title text-warning">{user.fullname}</Link>}
      </div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.name} className={location.pathname.includes(item.path) ? 'active' : ''}>
            <Link to={`/admin/${item.path}`} className="sidebar-link">
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="menu-text">{item.name}</span>}
            </Link>            
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;