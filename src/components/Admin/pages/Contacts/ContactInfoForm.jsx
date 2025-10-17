import { ContactInfoDetail, ContactInfoCreate, ContactInfoUpdate } from "../../../../api/admin";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ContactInfoForm = () => {
  const initialState = { name: "", email: "", phone: "", website: "", address: "", about: "" };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit;

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEdit) fetchContactInfo();
  }, [isEdit]);

  const fetchContactInfo = async () => {
    try {
      const response = await ContactInfoDetail();
      const contact = response.data;
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        website: contact.website,
        address: contact.address,
        about: contact.about,
      });
    } catch {
      toast.error("Failed to Fetch Contact Info");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (isEdit) {
        await ContactInfoUpdate(data);
        toast.success("Contact Info Updated Successfully!");
      } else {
        try {
          await ContactInfoCreate(data);
          toast.success("Contact Info Created Successfully!");
        } catch (err) {
          if (err.response?.data?.detail?.includes("Already Exists")) {
            toast.error("Contact Info Already Exists!");
          } else {
            toast.error("Failed to Create Contact Info!");
          }
          return;
        }
      }
      navigate(`/admin/contacts`, { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/contacts`)}></button>

        <h4 className={`text-center mb-3 ${isEdit ? "text-warning" : "text-success"}`}>
          {isEdit ? "UPDATE CONTACT INFO" : "CREATE CONTACT INFO"}
        </h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Institute Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Website Link</label>
            <input type="url" name="website" className="form-control" value={formData.website} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Full Address</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="form-label">Footer About</label>
          <ReactQuill theme="snow" value={formData.about} className="hsf"
            onChange={(value) => setFormData({ ...formData, about: value })} />
        </div>

        <div className="text-center">
          <button type="submit" className={`btn ${isEdit ? "btn-warning" : "btn-gen"} btn-sm w-50`}>
            {isEdit ? "UPDATE" : "CREATE"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactInfoForm;