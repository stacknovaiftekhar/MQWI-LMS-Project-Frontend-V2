import { resetRequest } from "../../api/auth";
import { FaEnvelope } from "react-icons/fa";
import { logo } from '../../assets/assets';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useState } from "react";
import Layout from "../Layout/Layout";

const ResetRequest = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please Enter Your Email Address.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetRequest({ email });
      toast.success(res.data.detail || "Password Reset Link sent to Your Email.");
      // setEmail("");
      navigate("/reset-message");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Something went Wrong!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
          {/* Left Part with Logo */}
          <div className="col-md-6 d-flex">
            <div className="card shadow d-none d-md-flex align-items-center justify-content-center w-100">
              <img src={logo.MainLogo} alt="Main Logo" className="img-fluid p-2" style={{ maxWidth: "340px" }} />
            </div>
          </div>

          {/* Right Part with Form */}
          <div className="col-md-6 d-flex">
            <div className="justify-content-center align-items-center w-100">
              <div className="auth card shadow">
                <div className="text-center">
                  <h3 className="mb-4">RESET REQUEST</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="position-relative mb-4">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter Your Email Address"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className="eye"><FaEnvelope /></span>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-gen btn-sm w-50" disabled={loading}>
                      {loading ? "Processing..." : "SEND RESET LINK"}
                    </button>
                  </div>
                </form>
              </div>
              <br />
              <div className="auth card shadow auth-bottom text-center">
                <p>Remember Your Password? <a href="/signin" className="btn-text ms-1">SIGN IN</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetRequest;