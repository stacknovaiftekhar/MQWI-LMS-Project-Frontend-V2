import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TeacherInfo, TeacherEdit } from "../../../../api/admin";

const TeacherUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '', name_bn: '', email: '', gender: '', username: '', password: '', bio: '', expertise: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch Existing Teacher Data
  useEffect(() => {
    TeacherInfo(id)
      .then((response) => {
        const data = response.data;
        setFormData({
          fullname: data.fullname || '',
          name_bn: data.name_bn || '',
          email: data.email || '',
          gender: data.gender || '',
          username: data.username || '',
          password: '',
          bio: data.bio || '',
          expertise: data.expertise || '',
        });
        setPreview(data.image || null);
      })
      .catch((error) => {
        console.error('Failed to Fetch Teacher Data:', error);
        toast.error('Failed to Load Teacher Data!');
      });
  }, [id]);

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
      await TeacherEdit(id, payload);
      toast.success('Teacher Updated Successfully!');
      navigate('/admin/teachers');
    } catch (error) {
      if (error.response?.data) {
        Object.values(error.response.data).forEach((msg) => toast.error(msg[0] || msg));
      } else {
        toast.error('Teacher Update Failed.');
      }
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/teachers`)}></button>

        <h4 className="text-center mb-3 text-success">Update Teacher Info</h4>

        {/* Image Preview and Upload */}
        <div className="mb-3 d-flex align-items-center">
          {preview && (
            <img src={preview} alt="Preview" className="rounded border" style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }} />
          )}
          <label className="btn btn-sm btn-outline-success mb-0">
            <FaUpload className="me-1" /> Upload Image
            <input type="file" name="image" accept="image/*" hidden onChange={handleImageChange} />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label hsf">বাংলা নাম</label>
          <input type="text" name="name_bn" className="form-control hsf" value={formData.name_bn} onChange={handleChange} />
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
          <label className="form-label">Qualification</label>
          <textarea name="bio" className="form-control hsf" rows="2" value={formData.bio} onChange={handleChange}></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Expertise</label>
          <input type="text" name="expertise" className="form-control hsf" value={formData.expertise} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input type="text" name="username" className="form-control" value={formData.username} disabled />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <input type={showPassword ? "text" : "password"} name="password" className="form-control"
            value={formData.password} onChange={handleChange} />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm w-50 fw-bold">UPDATE</button>
        </div>
      </form>
    </section>
  );
};

export default TeacherUpdate;