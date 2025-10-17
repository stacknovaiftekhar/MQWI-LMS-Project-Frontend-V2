import { FAIcon, search } from '../../../assets/faicons';
import { CourseList } from "../../../api/course";
import { navbar } from '../../../assets/assets';
import { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await CourseList();
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to Fetch Courses:", error);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Prevent Scroll Interaction with Navbar
    const navbar = document.querySelector('.navbar');
    const preventScroll = (e) => e.preventDefault();
    navbar?.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Prevent Scroll Interaction with Navbar
      navbar?.removeEventListener('wheel', preventScroll);
    };
  }, []);

  const navLinkActiveClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  return (
    <nav className={`navbar navbar-expand-lg nav-bg ${isSticky ? 'sticky' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={navbar.NavLogo} alt="Logo of Markajul Quran Wassunnah Institute" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item btn btn-nav"><NavLink to="/" className={navLinkActiveClass}>মূলপাতা</NavLink></li>
            <li className="nav-item btn btn-nav"><NavLink to="/about" className={navLinkActiveClass}>পরিচিতি</NavLink></li>
            <li className="nav-item dropdown btn btn-nav">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">কোর্স</a>
              <ul className="dropdown-menu nav-bg text-center" aria-labelledby="navbarDropdown">
                {courses.map((course, index) => (
                  <li key={course.id}>
                    <Link to={`/courses/${course.id}/${course.title.replace(/\s+/g, '-').toLowerCase()}`}
                      className="dropdown-item">{course.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item btn btn-nav"><NavLink to="/activity" className={navLinkActiveClass}>কার্যক্রম</NavLink></li>
            <li className="nav-item btn btn-nav"><NavLink to="/notice" className={navLinkActiveClass}>নোটিশ</NavLink></li>
            <li className="nav-item btn btn-nav"><NavLink to="/fatwa" className={navLinkActiveClass}>ফতোয়া</NavLink></li>
            <li className="nav-item btn btn-nav"><NavLink to="/sadaqah" className={navLinkActiveClass}>সাদাকাহ</NavLink></li>
          </ul>
          <form className="d-flex">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
              <button className="btn btn-outline-success" type="submit" id="button-addon2"><FAIcon icon={search.faSearch} /></button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;