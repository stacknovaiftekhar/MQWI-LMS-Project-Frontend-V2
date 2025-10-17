import { FAIcon, social } from '../../../assets/faicons';
import { SocialLinksDetail } from "../../../api/admin";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const navigate = useNavigate();

  const fetchSocialLinks = async () => {
    try {
      const response = await SocialLinksDetail();
      setSocialLinks(response.data);
    } catch (error) {
      console.error("Failed to Fetch Social Links:", error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    fetchSocialLinks();
  }, []);  

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin');
  };

  const quote = (
    <h6 className="hsf hsb">পড় তোমার রবের নামে, যিনি সৃষ্টি করেছেন।<span> - আল-আলাক্ব: ১</span></h6>
  )

  return (
    <div className="topbar">
      <div className="container">
        <div className="row align-items-center">

          {/* Quote: Top on small screens, hidden on medium screens */}
          <div className="col-12 d-md-none text-center mb-2 top-quote">{quote}</div>

          <div className="col-md-3 col-sm-6 col-6 mb-2 mb-md-0">
            <ul className="list-inline text-start top-social">
              <li className="list-inline-item" title='Facebook Page'>
                <a href={socialLinks?.facebook_page} target='_blank'>
                  <FAIcon icon={social.faFacebookSquare} />
                </a>
              </li>
              <li className="list-inline-item" title='Facebook Group'>
                <a href={socialLinks?.facebook_group} target='_blank'>
                  <FAIcon icon={social.faFacebookSquare} />
                </a>
              </li>
              <li className="list-inline-item" title='WhatsApp Group'>
                <a href={socialLinks?.whatsapp} target='_blank'>
                  <FAIcon icon={social.faWhatsappSquare} />
                </a>
              </li>
              <li className="list-inline-item" title='YouTube Channel'>
                <a href={socialLinks?.youtube} target='_blank'>
                  <FAIcon icon={social.faYoutubeSquare} />
                </a>
              </li>
            </ul>
          </div>

          {/* Quote: Hidden on small screens, visible on medium screens */}
          <div className="col-md-6 d-none d-md-block text-center top-quote">{quote}</div>

          {/* Authorization */}
          <div className="col-md-3 col-sm-6 col-6 text-end">
            {user ? (
              <div className="top-button">
                {/* <span className="me-2 fw-bold text-white d-md-none d-lg-inline">Hi, {user.fullname}</span> */}
                <Link to={user.is_superuser ? '/admin' : (user.is_staff ? '/teacher' : '/dashboard')} title="Dashboard"
                  className="btn btn-info btn-sm btn-size me-1"><AiOutlineDashboard className='fs-4' />
                </Link>
                {/* ALternative */}
                {/* <Link to={user.is_superuser ? '/admin' : user.is_staff ? '/teacher' : '/dashboard'}>Go</Link> */}
                <button className="btn btn-sm btn-danger btn-size btn-logout" onClick={handleLogout} title="Logout">
                  <FaSignOutAlt className='fs-4' />
                </button>
              </div>
            ) : (
              <div className="btn-group top-button">
                <Link to="/signin" className="btn btn-top btn-sm">SIGNIN</Link>
                <Link to="/signup" className="btn btn-top btn-sm">SIGNUP</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar;