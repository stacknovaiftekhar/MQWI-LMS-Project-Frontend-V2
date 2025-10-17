import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { signup } from "../../../../api/auth";

const TeacherCreate = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', gender: '', username: '', password: '', password2: '', });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Frontend Validation
    const { fullname, email, gender, username, password, password2 } = formData;

    if (!fullname || !email || !gender || !username || !password || !password2) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(fullname)) {
      toast.error('Full Name must contain only letters and spaces.');
      return;
    }

    if (!/^\d+$/.test(username)) {
      toast.error('Mobile Number must contain only digits.');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    if (password !== password2) {
      toast.error('Passwords do not match.');
      return;
    }

    const payload = { fullname, email, gender, username, password, password2, is_staff: true, };
    // const payload = { fullname, email, gender, username, password, password2: password2, is_staff: true, };  // OLD CODE

    try {
      const response = await signup(payload);
      toast.success(response.data.message || 'Teacher Registered Successfully!');
      // navigate('/admin/teachers');
      navigate('/admin/teachers', { state: { reload: true } });
    } catch (error) {
      // if (error.response && error.response.data) {   // OLD CODE
      if (error.response?.data) {
        const errors = error.response.data;
        Object.values(errors).forEach((msg) => toast.error(msg[0] || msg));
      } else {
        toast.error('Registration Failed! Please Try Again.');
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/teachers`)}></button>

        <h4 className="text-center mb-3 text-success">Add New Teacher</h4>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
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

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <input type={showPassword ? "text" : "password"} name="password" className="form-control"
            value={formData.password} onChange={handleChange} />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-4 position-relative">
          <label className="form-label">Confirm Password</label>
          <input type={showPassword2 ? "text" : "password"} name="password2" className="form-control"
            value={formData.password2} onChange={handleChange} />
          <span className="eye" onClick={() => setShowPassword2(!showPassword2)}>
            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-gen btn-sm w-50 fw-bold">REGISTER</button>
        </div>
      </form>
    </section>
  );
};

export default TeacherCreate;