import { FaUser, FaEnvelope, FaMobileAlt, FaStar } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router";
import { MessageMake } from "../../api/mixed";
import { useState, useEffect } from "react";
import { logo } from '../../assets/assets';
import { toast } from "react-toastify";

const ContactForm = () => {
  const initialState = { name: "", email: "", mobile: "", subject: "", message: "" };
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.reload) setFormData(initialState);
  }, [location.state?.reload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await MessageMake(formData);
      toast.success("Message Submitted Successfully!");
      setFormData(initialState);
      navigate('/contact', { state: { reload: true } });
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to Submit Message!");
    }
  };

  return (
    <section className="contact-form">
      <div className="container-fluid" style={{ background: "#EAFAF1" }}>
        <div className="container py-5">
          <div className="row">
            {/* Left Part with Logo */}
            <div className="col-lg-5 d-lg-flex d-none">              
              <div className="card shadow d-none d-md-flex align-items-center justify-content-center w-100">
                <img src={logo.MainLogo} alt="Main Logo" className="img-fluid p-2" style={{ maxWidth: "420px" }} />
              </div>
            </div>

            {/* Right Part with Form */}
            <div className="col-lg-7 d-flex">
              <div className="justify-content-center align-items-center w-100">
                <form onSubmit={handleSubmit} className="shadow border rounded bg-white p-4">
                  <h3 className="text-center text-success mb-4">CONTACT FORM</h3>

                  <div className="position-relative mb-3">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    <span className="icon"><FaUser /></span>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 position-relative mb-3">
                      <label className="form-label">Email Address</label>
                      <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                      <span className="icon icon-right"><FaEnvelope /></span>
                    </div>
                    <div className="col-sm-6 position-relative mb-3">
                      <label className="form-label">Mobile Number *</label>
                      <input type="tel" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
                      <span className="icon icon-right"><FaMobileAlt /></span>
                    </div>
                  </div>

                  <div className="position-relative mb-3">
                    <label className="form-label">Subject *</label>
                    <input type="text" name="subject" className="form-control" value={formData.subject} onChange={handleChange} required />
                    <span className="icon"><FaStar /></span>
                  </div>

                  <div className="position-relative mb-4">
                    <label className="form-label">Message *</label>
                    <textarea name="message" className="form-control" value={formData.message} onChange={handleChange} rows="4" required />
                    <span className="icon"><BsPencilSquare /></span>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-gen btn-sm w-50">SUBMIT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm;