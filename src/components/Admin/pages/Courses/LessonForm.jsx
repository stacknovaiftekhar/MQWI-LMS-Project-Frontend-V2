import { LessonInfo, LessonMake, LessonEdit } from "../../../../api/course";
import { useParams, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const LessonForm = () => {
  const initialState = { module: "", title: "", video: "", sheet: null, content: "" };
  const [formData, setFormData] = useState(initialState);
  const [preview, setPreview] = useState(null);
  const { lid } = useParams();
  const isEdit = !!lid;
  const location = useLocation();
  const moduleId = location.state?.moduleId;
  const courseId = location.state?.courseId;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await LessonInfo(lid);
        const lesson = response.data;
        setFormData({
          module: lesson.module,
          title: lesson.title,
          video: lesson.video,
          content: lesson.content,
        });
        setPreview(lesson.sheet || null);
      } catch {
        toast.error("Failed to Fetch Lesson Info");
      }
    };

    if (isEdit) fetchLesson();
    else setFormData((prev) => ({ ...prev, module: moduleId }));
  }, [lid, moduleId, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    if (name === "sheet" && files.length > 0) {
      setFormData(prev => ({ ...prev, sheet: files[0] }));
      setPreview(files[0].name);
      const fileUrl = URL.createObjectURL(files[0]);
      setFormData(prev => ({ ...prev, sheetUrl: fileUrl }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData()

    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (isEdit) {
        await LessonEdit(lid, data);
        toast.success("Lesson Updated Successfully!");
      } else {
        await LessonMake(data);
        toast.success("Lesson Created Successfully!");
      }
      navigate(`${user.is_superuser ? '/admin' : '/teacher'}/courses/${courseId}/modules`, { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  const handleCancel = () => navigate(`${user.is_superuser ? '/admin' : '/teacher'}/courses/${courseId}/modules`);

  return (
    <form onSubmit={handleSubmit} className="shadow border rounded bg-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className={`${isEdit ? "text-warning" : "text-success"} mb-0`}>
          {isEdit ? "EDIT LESSON" : "CREATE LESSON"}
        </h4>
        <button type="button" className="btn-close" onClick={handleCancel}></button>
      </div>

      <div className="mb-3">
        <label className="form-label">Lesson Title</label>
        <input type="text" name="title" className="form-control hsf" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Video Link</label>
        <input type="url" name="video" className="form-control" value={formData.video}
          onChange={handleChange} placeholder="https://www.example.com/video.mp4" />
        {isEdit && formData.video && (
          <small className="text-primary d-block mt-1 ms-2">
            Current: <a href={formData.video} target="_blank" rel="noreferrer">{formData.video}</a>
          </small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">PDF Sheet</label>
        <input type="file" name="sheet" className="form-control" accept=".pdf" onChange={handleChange} />
        {preview && <small className="text-muted d-block mt-1 ms-2">Selected: {preview}</small>}
        {isEdit && formData.sheetUrl && (
          <small className="text-primary d-block mt-1 ms-2">
            Current: <a href={formData.sheetUrl} target="_blank" rel="noreferrer">{preview}</a>
          </small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Lesson Content</label>
        <textarea name="content" className="form-control hsf" rows={2} value={formData.content} onChange={handleChange} />
      </div>

      <div className="text-center">
        <button type="submit" className={`btn ${isEdit ? "btn-warning" : "btn-gen"} btn-sm w-50 fw-bold`}>
          {isEdit ? "UPDATE" : "CREATE"}
        </button>
      </div>
    </form>
  );
};

export default LessonForm;