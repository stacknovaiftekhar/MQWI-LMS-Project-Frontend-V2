import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const ContactInfoCard = ({ contactInfo, onDelete }) => {
  const isValid = contactInfo && Object.values(contactInfo).some((val) => val);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow w-100 p-3">
        {isValid ? (
          <>
            <h4 className="text-center text-success pb-2">Contact Info</h4>
            {/* NEW */}
            <ul className="border-0 list-group w-100 mb-3">
              <div className="d-flex">
                <li className="list-group-item w-50">👤 Institute Name:- {contactInfo.name}</li>
                <li className="list-group-item w-50 border-start-0 border-1">📧 Email Address:- {contactInfo.email}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-50 border-top-0">📞 Phone Number:- {contactInfo.phone}</li>
                <li className="list-group-item w-50 border-start-0">🌐 Website Link:- {contactInfo.website}</li>
              </div>
              <li className="list-group-item border-top-0">🏠 Full Address:- {contactInfo.address}</li>
              {/* <li className="list-group-item">📜 Footer About: {contactInfo.about}</li> */}
              <li className="list-group-item">📜 Footer About:-
                <div dangerouslySetInnerHTML={{ __html: contactInfo.about }} className="hsf ms-2" />
              </li>
            </ul>
            <div className="d-flex justify-content-center align-items-center">
              <Link to="contact-info" state={{ isEdit: true }} className="btn btn-outline-warning btn-sm w-25 me-4">
                <FaEdit className="me-1" /> EDIT CONTACT INFO
              </Link>
              <button className="btn btn-sm btn-outline-danger w-25" onClick={onDelete}>
                <FaTrash className="me-1" /> DELETE CONTACT INFO
              </button>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link to="contact-info" className="btn btn-outline-success w-25">
              <FaPlusCircle className="me-1 mb-1" /> ADD CONTACT INFO
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfoCard;