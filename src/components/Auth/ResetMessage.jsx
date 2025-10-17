import { FaCheckCircle } from 'react-icons/fa';
import Layout from "../Layout/Layout";
import Auth from "./Auth";
import './ResetMessage.css';

const ResetMessage = () => {
  return (
    <Layout>
      <Auth>
        <div className="auth card shadow py-5 reset-message">
          <div className="text-center">
            <FaCheckCircle size={80} color="#28B463" className="mb-4" />
            <h5 className="text-success fw-semibold mb-4">We Have Received Your Password Change Request</h5>
            <p className="text-dark mb-3">You will receive an email with instructions to reset your password.</p>
            <p className="text-dark mb-4">Please follow the link in the email within 24 hours<br />to reset your password.</p>
            <p className="text-muted fst-italic mb-0"><strong>Note:</strong> If the submitted email address is not a registered account,<br />
              you will not receive a password reset email.</p>
          </div>
        </div>
        <br />
        <div className="auth card shadow auth-bottom text-center">
          <p>Remember Your Password? <a href="/signin" className="btn-text ms-1">SIGN IN</a></p>
        </div>
      </Auth>
    </Layout>
  );
};

export default ResetMessage;