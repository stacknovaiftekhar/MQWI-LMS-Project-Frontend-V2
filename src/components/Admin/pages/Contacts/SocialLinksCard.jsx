import { Link } from 'react-router-dom';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';

const SocialLinksCard = ({ socialLinks, onDelete }) => {
  const isValid = socialLinks && Object.values(socialLinks).some((val) => val);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow w-100 p-3">
        {isValid ? (
          <>
            <h4 className="text-center text-success pb-2">Social Links</h4>
            <ul className="border-0 list-group w-100 mb-3">
              <div className="d-flex">
                <li className="list-group-item w-50">📘 Facebook Page:- {socialLinks.facebook_page}</li>
                <li className="list-group-item w-50 border-start-0 border-1">👥 Facebook Group:- {socialLinks.facebook_group}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-50 border-top-0">💬 WhatsApp Link:- {socialLinks.whatsapp}</li>
                <li className="list-group-item w-50 border-start-0">📺 YouTube Channel:- {socialLinks.youtube}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-50 border-top-0">🐦 Twitter Profile:- {socialLinks.twitter}</li>
                <li className="list-group-item w-50 border-start-0">💼 Linkedin Profile:- {socialLinks.linkedin}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-50 border-top-0">📸 Instagram Profile:- {socialLinks.instagram}</li>
                <li className="list-group-item w-50 border-start-0">📢 Telegram Channel:- {socialLinks.telegram}</li>
              </div>
            </ul>
            <div className="d-flex justify-content-center align-items-center">
              <Link to="social-links" state={{ isEdit: true }} className="btn btn-outline-warning btn-sm w-25 me-4">
                <FaEdit className="me-1" /> EDIT SOCIAL LINKS
              </Link>
              <button className="btn btn-sm btn-outline-danger w-25" onClick={onDelete}>
                <FaTrash className="me-1" /> DELETE SOCIAL LINKS
              </button>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link to="social-links" className="btn btn-outline-success w-25">
              <FaPlusCircle className="me-1 mb-1" /> ADD SOCIAL LINKS
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLinksCard;