import { logo } from '../../assets/assets';
import './Auth.css';

const Auth = ({ children }) => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Part with Logo */}
        <div className="col-md-6 d-flex">
          <div className="card shadow d-none d-md-flex align-items-center justify-content-center w-100">
            <img src={logo.MainLogo} alt="Main Logo" className="img-fluid p-2" style={{ maxWidth: "420px" }} />
          </div>
        </div>

        {/* Right Part with Form */}
        <div className="col-md-6 d-flex">
          <div className="justify-content-center align-items-center w-100">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
