import { ModuleInfo, ModuleMake, ModuleEdit } from "../../../../api/course";
import { useParams, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModuleForm = () => {
  const initialState = { course: "", title: "", description: "", order: "" };
  const [formData, setFormData] = useState(initialState);
  const { id, mid } = useParams();    // id = courseId
  const isEdit = Boolean(mid);        // const isEdit = !!mid;
  const location = useLocation();
  const courseId = location.state?.courseId || id;  // Fallback to id from URL
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEdit) {
      fetchModule();
    } else {
      // Ensure courseId is set for new module
      setFormData(prev => ({ ...prev, course: courseId }));
    }
  }, [mid]);

  const fetchModule = async () => {
    try {
      const response = await ModuleInfo(mid);
      const module = response.data;
      setFormData({
        course: module.course,
        title: module.title,
        description: module.description,
        order: module.order,
      });
    } catch (error) {
      toast.error("Failed to Fetch Module Info");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    }

    try {
      if (isEdit) {
        await ModuleEdit(mid, data);
        toast.success("Module Updated Successfully!");
      } else {
        await ModuleMake(data);
        toast.success("Module Created Successfully!");
      }
      navigate(`${user.is_superuser ? '/admin' : '/teacher'}/courses/${courseId}/modules`, { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
      {/* <button type="button" onClick={() => navigate(`/admin/courses/${courseId}/modules`)} */}
      <button type="button" onClick={() => navigate(`${user.is_superuser ? '/admin' : '/teacher'}/courses/${courseId}/modules`)}
        className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close"></button>

      <h4 className={`text-center mb-3 ${isEdit ? "text-warning" : "text-success"}`}>
        {isEdit ? "EDIT MODULE" : "CREATE MODULE"}
      </h4>

      <div className="mb-3">
        <label className="form-label">Module Title</label>
        <input type="text" name="title" className="form-control hsf" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Module Description</label>
        <textarea name="description" className="form-control hsf" rows={2} value={formData.description} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Module Order</label>
        <input type="number" name="order" className="form-control" value={formData.order} onChange={handleChange} required />
      </div>

      <div className="text-center">
        <button type="submit" className={`btn ${isEdit ? "btn-warning" : "btn-gen"} btn-sm w-50 fw-bold`}>
          {isEdit ? "UPDATE" : "CREATE"}
        </button>
      </div>
    </form>
  );
};

export default ModuleForm;