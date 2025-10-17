import { StudentInfo, StudentEdit } from "../../../../api/admin";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {
  const initialState = { fullname: '', gender: '', occupation: '', designation: '', organization: '',
    facebook: '', linkedin: '', whatsapp: '', address: '' };
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const sid = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Fetch Existing Profile Data
  useEffect(() => {
    StudentInfo(sid)
      .then((response) => {
        const data = response.data;
        setFormData({
          fullname: data.fullname || '',
          email: data.email || '',
          username: data.username || '',
          gender: data.gender || '',
          occupation: data.occupation || '',
          designation: data.designation || '',
          organization: data.organization || '',
          facebook: data.facebook || '',
          linkedin: data.linkedin || '',
          whatsapp: data.whatsapp || '',
          address: data.address || '',
        });
        setPreview(data.image || null);
      })
      .catch((error) => {
        console.error('Failed to Fetch Profile Data:', error);
        toast.error('Failed to Load Profile Data!');
      });
  }, [sid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    for (let key in formData) {
      if (formData[key]) {
        payload.append(key, formData[key]);
      }
    }
    if (image) payload.append('image', image);

    try {
      await StudentEdit(sid, payload);
      toast.success('Profile Updated Successfully!');
      navigate('/dashboard/profile', { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Profile Update Failed!");
    }
  };

  return (
    <section className="container my-5">
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative py-4 px-5">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/dashboard/profile`)}></button>
        <h4 className="text-center text-success mb-4">Update Your Profile Info</h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">WhatsApp Number</label>
            <input type="text" name="whatsapp" className="form-control" value={formData.whatsapp} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Mobile Number</label>
            <input type="text" name="username" className="form-control" value={formData.username} disabled />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            {/* Image Preview and Upload */}
            <div className="d-flex align-items-center">
              {preview && (<img src={preview} alt="Image Preview" className="rounded border"
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '20px' }} />)}
              <label className="btn btn-sm btn-outline-success">
                <FaUpload className="me-1" /> Upload Image
                <input type="file" name="image" accept="image/*" hidden onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex mt-4">
              <label className="form-label me-3 mb-3">Gender:</label>
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
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Occupation</label>
            <select name="occupation" className="form-select" value={formData.occupation} onChange={handleChange}>
              <option value="">-- Select Occupation --</option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Designation / Degree</label>
            <input type="text" name="designation" className="form-control" value={formData.designation} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Organization / Institute</label>
          <input type="text" name="organization" className="form-control" value={formData.organization} onChange={handleChange} />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Facebook Link</label>
            <input type="url" name="facebook" className="form-control" value={formData.facebook} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Linkedin Link</label>
            <input type="text" name="linkedin" className="form-control" value={formData.linkedin} onChange={handleChange} />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Full Address</label>
          <textarea name="address" className="form-control" value={formData.address} onChange={handleChange} rows={2} />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm w-50 fw-bold">UPDATE</button>
        </div>
      </form>
    </section>
  );
};

export default ProfileUpdate;