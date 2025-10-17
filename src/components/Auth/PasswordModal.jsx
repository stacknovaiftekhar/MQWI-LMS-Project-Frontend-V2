import axios from '../../utilities/axiosInstance';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useState } from 'react';



// .profile .modal .eye {
//   right: 12px;
//   top: 28px;
// }


const PasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ old_password: '', new_password: '', confirm_password: '', });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      toast.error('New Passwords do not match.');
      return;
    }

    try {
      await axios.put('/users/change-password', {
        old_password: formData.old_password,
        new_password: formData.new_password,
      });

      toast.success('Password Changed Successfully.');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to Change Password.');
    }
  };

  const eye = { right: "12px", top: "28px" }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title text-success">Change Password</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="position-relative mb-3">
              <label>Current Password</label>
              <input type={showPassword1 ? "text" : "password"} name="old_password"
                className="form-control" onChange={handleChange} required />
              <span className="eye" style={eye} onClick={() => setShowPassword1(!showPassword1)}>
                {showPassword1 ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            <div className="position-relative mb-3">
              <label>New Password</label>
              <input type={showPassword2 ? "text" : "password"} name="new_password"
                className="form-control" onChange={handleChange} required />
              <span className="eye" style={eye} onClick={() => setShowPassword2(!showPassword2)}>
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            <div className="position-relative mb-3">
              <label>Confirm Password</label>
              <input type={showPassword3 ? "text" : "password"} name="confirm_password"
                className="form-control" onChange={handleChange} required />
              <span className="eye" style={eye} onClick={() => setShowPassword3(!showPassword3)}>
                {showPassword3 ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="submit" className="btn btn-sm px-3 btn-warning">UPDATE</button>
            <button type="button" className="btn btn-sm px-3 btn-secondary" onClick={onClose}>CANCEL</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;