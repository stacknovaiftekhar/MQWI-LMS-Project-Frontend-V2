import { TeacherInfo, TeacherEdit } from "../../../../api/admin";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {
  const initialState = { fullname: '', name_bn: '', gender: '', bio: '', expertise: '' }
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const tid = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  // Fetch Existing Profile Data
  useEffect(() => {
    TeacherInfo(tid)
      .then((response) => {
        const data = response.data;
        setFormData({
          fullname: data.fullname || '',
          name_bn: data.name_bn || '',
          email: data.email || '',
          username: data.username || '',
          gender: data.gender || '',
          bio: data.bio || '',
          expertise: data.expertise || '',
        });
        setPreview(data.image || null);
      })
      .catch((error) => {
        console.error('Failed to Fetch Profile Data:', error);
        toast.error('Failed to Load Profile Data!');
      });
  }, [tid]);

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
      await TeacherEdit(tid, payload);
      toast.success('Profile Updated Successfully!');
      navigate('/teacher/profile', { state: { reload: true } });
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("Profile Update Failed!");
    }
  };

  return (
    <section className="mb-4">
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative py-4 px-5">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/teacher/profile`)}></button>
        <h4 className="text-center text-success mb-4">Update Your Profile Info</h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label hsf">বাংলা নাম</label>
            <input type="text" name="name_bn" className="form-control hsf" value={formData.name_bn} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} disabled />
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

        <div className="mb-3">
          <label className="form-label">Qualification</label>
          <input type="text" name="bio" className="form-control hsf" value={formData.bio} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="form-label">Expertise</label>
          <input type="text" name="expertise" className="form-control hsf" value={formData.expertise} onChange={handleChange} />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm w-50 fw-bold">UPDATE</button>
        </div>
      </form>
    </section>
  );
};

export default ProfileUpdate;