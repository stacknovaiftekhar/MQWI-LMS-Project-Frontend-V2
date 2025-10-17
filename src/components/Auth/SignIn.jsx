import { FaMobileAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { signin } from "../../api/auth";
import Layout from '../Layout/Layout';
import Auth from "./Auth";

const SignIn = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      toast.error("Both Username and Password are Required");
      return;
    }

    const payload = { username, password, };

    try {
      const response = await signin(payload);
      const { access, refresh, user } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");
      navigate(user.is_superuser ? "/admin" : "/");
      navigate(user.is_staff ? "/teacher" : "/");
      navigate(user ? "/dashboard" : "/");
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login Failed! Please try again.');
    }
  };

  return (
    <Layout>
      <Auth>
        <div className="auth card shadow">
          <div className="text-center">
            <h3 className="mb-4">SIGN IN</h3>
          </div>
          <form onSubmit={handleSubmit}>
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
            <div className="text-center mb-3">
              <Link to="/reset-request" className="btn-text">Forgot Password?</Link>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-gen btn-sm w-50">SIGN IN</button>
            </div>
          </form>
        </div>
        <br />
        <div className="auth card shadow auth-bottom text-center">
          <p>Don&apos;t have an Account? <Link to="/signup" className="btn-text ms-1">Create an Account</Link></p>
        </div>
      </Auth>
    </Layout>
  );
};

export default SignIn;