import { CategoryMake, CategoryEdit, CategoryInfo } from "../../../../api/course";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [formData, setFormData] = useState({ name: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchCategory();
    }
    setFormData({ name: '' });
  }, [id]);

  const fetchCategory = async () => {
    try {
      // const response = await CategoryList(); // you may replace this with a `CategoryDetail(id)` call if needed
      // const cat = response.data.find(c => c.id === parseInt(id));
      // if (cat) setFormData({ name: cat.name });
      const response = await CategoryInfo(id);
      setFormData({ name: response.data.name });
    } catch {
      toast.error("Failed to Fetch Categories!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Please Enter a Category Name.');
      return;
    }

    try {
      if (isEdit) {
        await CategoryEdit(id, formData);
        toast.success("Category Updated Successfully!");
      } else {
        await CategoryMake(formData);
        setFormData({ name: '' });
        toast.success("Category Created Successfully!");
      }
      navigate('/admin/category', { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/category`)}></button>

        <h4 className={`text-center mb-3 ${isEdit ? "text-warning" : "text-success"}`}>
          {isEdit ? "EDIT CATEGORY" : "CREATE CATEGORY"}
        </h4>

        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input type="text" name="name" className="form-control hsf" value={formData.name} onChange={handleChange} />
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

export default CategoryForm;