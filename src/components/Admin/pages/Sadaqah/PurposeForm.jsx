import { PurposeInfo, PurposeMake, PurposeEdit } from "../../../../api/mixed";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PurposeForm = () => {
  const [formData, setFormData] = useState({ name_en: "", name_bn: "" });
  const { pid } = useParams();
  const isEdit = !!pid;
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) fetchPurpose();
  }, [pid]);

  const fetchPurpose = async () => {
    try {
      const response = await PurposeInfo(pid);
      const purpose = response.data;
      setFormData({
        name_en: purpose.name_en,
        name_bn: purpose.name_bn
      });
    } catch (error) {
      toast.error("Failed to Fetch Purpose Info:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await PurposeEdit(pid, formData);
        toast.success("Purpose Updated Successfully!");
      } else {
        await PurposeMake(formData);
        setFormData({ name_en: "", name_bn: "" });
        toast.success("Purpose Created Successfully!");
      }
      navigate('/admin/sadaqah/purpose', { state: { reload: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/sadaqah/purpose`)}></button>

        <h4 className={`text-center mb-3 ${isEdit ? "text-warning" : "text-success"}`}>
          {isEdit ? "EDIT PURPOSE" : "CREATE PURPOSE"}
        </h4>

        <div className="mb-3">
          <label className="form-label">Purpose in English</label>
          <input type="text" name="name_en" className="form-control" value={formData.name_en} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Purpose in Bangla</label>
          <input type="text" name="name_bn" className="form-control hsf" value={formData.name_bn} onChange={handleChange} />
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

export default PurposeForm;