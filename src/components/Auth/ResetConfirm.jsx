import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { resetConfirm } from "../../api/auth";
import Layout from "../Layout/Layout";
import Auth from "./Auth";

const ResetConfirm = () => {
  const { uid, token } = useParams();
  const [formData, setFormData] = useState({ new_password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.new_password || !formData.confirm_password) {
      toast.error("Please Fill in Both Password Fields.");
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      toast.error("Passwords do not Match.");
      return;
    }

    const payload = { new_password: formData.new_password };

    try {
      setLoading(true);
      const res = await resetConfirm(uid, token, payload);
      toast.success(res.data.detail || "Password has been Reset Successfully.");
      navigate("/signin");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Something went Wrong!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Auth>
        <div className="auth card shadow">
          <div className="text-center">
            <h3 className="mb-4">SET NEW PASSWORD</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="position-relative mb-3">
              <label className="form-label">New Password</label>
              <input type={showPassword ? "text" : "password"} name="new_password" className="form-control"
                value={formData.new_password} onChange={handleChange} />
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="position-relative mb-4">
              <label className="form-label">Confirm Password</label>
              <input type={showPassword2 ? "text" : "password"} name="confirm_password" className="form-control"
                value={formData.confirm_password} onChange={handleChange} />
              <span className="eye" onClick={() => setShowPassword2(!showPassword2)}>
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-gen btn-sm w-50" disabled={loading}>
                {loading ? "Processing..." : "RESET PASSWORD"}
              </button>
            </div>
          </form>
        </div>
        <br />
        <div className="auth card shadow auth-bottom text-center">
          <p>Remembered Your Password? <a href="/signin" className="btn-text ms-1">SIGN IN</a></p>
        </div>
      </Auth>
    </Layout>
  );
};

export default ResetConfirm;