import { FaUser, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Menubar = () => {
  const staff = JSON.parse(localStorage.getItem('user'));

  const menuItems = [
    { name: 'Profile', path: 'profile', icon: <FaUser /> },
    { name: 'Courses', path: 'courses', icon: <FaBook /> },
    { name: 'Signout', path: 'signout', icon: <FaSignOutAlt />, class: "bg-danger" },
  ];

  const navLinkActive = ({ isActive }) => isActive ? "active" : "";

  return (
    <nav className="navbar navbar-expand-md menubar">
      <div className="container">
        <span className="staff-name">Welcome, {staff.fullname}</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menubarNav"
          aria-controls="menubarNav" aria-expanded="false" aria-label="Toggle Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menubarNav">
          <ul className="navbar-nav ms-auto menu-list">
            {menuItems.map((item) => (
              <li key={item.name} className="nav-item">
                <NavLink to={`/teacher/${item.path}`} className={`nav-link ${navLinkActive} ${item.class}`}>
                  <span className="icon"><i>{item.icon}</i>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menubar;