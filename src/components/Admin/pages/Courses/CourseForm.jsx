import { CategoryList, CourseInfo, CourseMake, CourseEdit } from "../../../../api/course";
import { useParams, useNavigate } from "react-router";
import { TeacherList } from "../../../../api/admin";
import { useEffect, useState } from "react";
import { FaUpload } from 'react-icons/fa';
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CourseForm = () => {
  const initialState = { title: "", title_en: "", category: "", teacher: "",
    short_desc: "", description: "", specialty: "", start_date: "" };
  const [formData, setFormData] = useState(initialState);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    fetchCategories();
    fetchTeachers();
    if (isEdit) fetchCourse();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await CategoryList();
      setCategories(response.data);
    } catch {
      toast.error("Failed to Fetch Categories");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await TeacherList();
      setTeachers(response.data);
    } catch {
      toast.error("Failed to Fetch Teachers");
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await CourseInfo(id);
      const course = response.data;
      setFormData({
        title: course.title,
        title_en: course.title_en,
        category: course.category,
        teacher: course.teacher,
        short_desc: course.short_desc,
        description: course.description,
        specialty: course.specialty,
        start_date: course.start_date,
      });
      setPreview(course.thumbnail || null);
    } catch {
      toast.error("Failed to Fetch Course Info");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }
    if (thumbnail) data.append("thumbnail", thumbnail);

    try {
      if (isEdit) {
        await CourseEdit(id, data);
        toast.success("Course Updated Successfully!");
      } else {
        await CourseMake(data);
        toast.success("Course Created Successfully!");
      }
      navigate("/admin/courses", { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <section className="p-3">
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/courses`)}></button>

        <h4 className={`text-center ${isEdit ? "text-warning" : "text-success"} mb-3`}>{isEdit ? "EDIT COURSE" : "CREATE COURSE"}</h4>

        <div className="mb-3">
          <label className="form-label">Course Title in Bangla</label>
          <input type="text" name="title" className="form-control hsf" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Course Title in English</label>
          <input type="text" name="title_en" className="form-control hsf" value={formData.title_en} onChange={handleChange} />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select name="category" className="form-select hsf" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Instructor</label>
            <select name="teacher" className="form-select hsf" value={formData.teacher} onChange={handleChange} required>
              <option value="">Select Instructor</option>
              {teachers.map((teacher) => (<option key={teacher.id} value={teacher.id}>{teacher.name_bn}</option>))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 d-flex align-items-center mb-3">
            {preview && (
              <img src={preview} alt="Preview" className="rounded border"
                style={{ width: '150px', objectFit: 'cover', marginRight: '20px' }} />
            )}
            <label className="btn btn-sm btn-outline-success mb-0">
              <FaUpload className="me-1" /> Upload Thumbnail
              <input type="file" name="thumbnail" accept="image/*" hidden onChange={handleImageChange} />
            </label>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date</label>
            <input type="date" name="start_date" className="form-control"
              value={formData.start_date} onChange={handleChange} required />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <textarea name="short_desc" className="form-control hsf" value={formData.short_desc}
            onChange={handleChange} rows={2} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Detail Description</label>
          <ReactQuill theme="snow" value={formData.description} className="bg-white hsf"
            onChange={(value) => setFormData({ ...formData, description: value })} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Specialty</label>
          <ReactQuill theme="snow" value={formData.specialty} className="hsf"
            onChange={(value) => setFormData({ ...formData, specialty: value })} />
        </div>

        <div className="text-center">
          <button type="submit" className={`btn ${isEdit ? "btn-warning" : "btn-gen"} btn-sm w-50 fw-bold`}>
            {isEdit ? "UPDATE" : "CREATE"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CourseForm;