import { FaUser, FaEnvelope, FaMobileAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signup } from "../../api/auth";
import Layout from '../Layout/Layout';
import Auth from "./Auth";

const SignUp = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', gender: '', username: '', password: '', password2: '', });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  // Update Form Values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Frontend Validation
    const { fullname, email, gender, username, password, password2 } = formData;
    if (!fullname || !email || !gender || !username || !password || !password2) {
      toast.error('Please fill in all Fields.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullname)) {
      toast.error('Full Name must contain only Letters and Spaces.');
      return;
    }

    if (!/^\d+$/.test(username)) {
      toast.error('Mobile Number must contain only Digits.');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 Characters long.');
      return;
    }

    if (password !== password2) {
      toast.error('Passwords do not Match.');
      return;
    }

    // Prepare form for backend
    const payload = { fullname, email, gender, username, password, password2: password2, is_staff: false, };

    try {
      const response = await signup(payload);
      toast.success(response.data.message || 'You have Registered Successfully!');
      navigate('/signin');
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.values(errors).forEach((msg) => toast.error(msg[0] || msg));
      } else {
        toast.error('Registration Failed! Please Try Again.');
      }
    }
  };

  return (
    <Layout>
      <Auth>
        <div className="auth card shadow">
          <div className="text-center">
            <h3 className="mb-4">SIGN UP</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="position-relative mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
              <span className="eye"><FaUser /></span>
            </div>
            <div className="position-relative mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
              <span className="eye"><FaEnvelope /></span>
            </div>
            <div className="mb-3">
              <label className="form-label me-3">Gender:</label>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" value="Male"
                  checked={formData.gender === 'Male'} onChange={handleChange} />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" value="Female"
                  checked={formData.gender === 'Female'} onChange={handleChange} />
                <label className="form-check-label">Female</label>
              </div>
            </div>
            <div className="position-relative mb-3">
              <label className="form-label">Mobile Number</label>
              <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} />
              <span className="eye"><FaMobileAlt /></span>
            </div>
            <div className="position-relative mb-3">
              <label className="form-label">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" className="form-control"
                value={formData.password} onChange={handleChange} />
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="position-relative mb-4">
              <label className="form-label">Confirm Password</label>
              <input type={showPassword2 ? "text" : "password"} name="password2" className="form-control"
                value={formData.password2} onChange={handleChange} />
              <span className="eye" onClick={() => setShowPassword2(!showPassword2)}>
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-gen btn-sm w-50">SIGN UP</button>
            </div>
          </form>
        </div>
        <br />
        <div className="auth card shadow auth-bottom text-center">
          <p>Already have an Account? <Link to="/signin" className="btn-text ms-1">SIGN IN</Link></p>
        </div>
      </Auth>
    </Layout>
  );
};

export default SignUp;