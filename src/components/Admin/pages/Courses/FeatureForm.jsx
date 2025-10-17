import { FeatureInfo, FeatureMake, FeatureEdit } from "../../../../api/course";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FeatureForm = () => {
  const initialState = {
    course: "", duration: "", session: "", enrollment: "", tuition: "", gender: "", format: "",
    opportunity: "", guidance: "", revision: "", support: "", resources: "", certificate: ""
  };
  const [formData, setFormData] = useState(initialState);
  const { id, fid } = useParams();
  const navigate = useNavigate();
  const isEdit = !!fid;

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEdit) fetchFeatures();
  }, [fid]);

  const fetchFeatures = async () => {
    try {
      const response = await FeatureInfo(fid);
      const features = response.data;
      setFormData({
        course: features.course,
        duration: features.duration,
        session: features.session,
        enrollment: features.enrollment,
        tuition: features.tuition,
        gender: features.gender,
        format: features.format,
        opportunity: features.opportunity,
        guidance: features.guidance,
        revision: features.revision,
        support: features.support,
        resources: features.resources,
        certificate: features.certificate,
      });
    } catch {
      toast.error("Failed to Fetch Features Info");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.course = id;
    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (isEdit) {
        await FeatureEdit(fid, data);
        toast.success("Features Updated Successfully!");
      } else {
        try {
          await FeatureMake(data);
          toast.success("Features Created Successfully!");
        } catch (err) {
          if (err.response?.data?.detail?.includes("Already Exist")) {
            toast.error("This course already has features.");
          } else {
            toast.error("Failed to Create Features!");
          }
          return;
        }
      }
      navigate(`/admin/courses/detail/${id}`, { state: { reload: true } });
      // window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit} className="shadow border rounded position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/courses/detail/${id}`)}></button>

        <h4 className={`text-center ${isEdit ? "text-warning" : "text-success"} mb-4`}>
          {isEdit ? "EDIT FEATURES" : "CREATE FEATURES"}
        </h4>

        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">কোর্সের মেয়াদকাল</span>
              <input type="number" name="duration" className="form-control"
                value={formData.duration} onChange={handleChange} required />
              <span className="input-group-text">মাস</span>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">ক্লাস: সপ্তাহে</span>
              <input type="number" name="session" className="form-control"
                value={formData.session} onChange={handleChange} required />
              <span className="input-group-text">দিন</span>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">ভর্তি-ফি</span>
              <input type="number" name="enrollment" className="form-control"
                value={formData.enrollment} onChange={handleChange} required />
              <span className="input-group-text">টাকা</span>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">মাসিক-ফি</span>
              <input type="number" name="tuition" className="form-control"
                value={formData.tuition} onChange={handleChange} required />
              <span className="input-group-text">টাকা</span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">আলাদা/উন্মুক্ত</span>
              <input type="text" name="gender" className="form-control"
                value={formData.gender} onChange={handleChange} />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">ক্লাস মাধ্যম</span>
              <input type="text" name="format" className="form-control"
                value={formData.format} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">প্রশ্নোত্তর</span>
              <input type="text" name="opportunity" className="form-control"
                value={formData.opportunity} onChange={handleChange} />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">পড়া ও মাশক</span>
              <input type="text" name="guidance" className="form-control"
                value={formData.guidance} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">পুনরাবৃত্তি</span>
              <input type="text" name="revision" className="form-control"
                value={formData.revision} onChange={handleChange} />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">সাপোর্ট</span>
              <input type="text" name="support" className="form-control"
                value={formData.support} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">উপকরণ</span>
              <input type="text" name="resources" className="form-control"
                value={formData.resources} onChange={handleChange} />
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="input-group mb-3 hsf">
              <span className="input-group-text">সার্টিফিকেট</span>
              <input type="text" name="certificate" className="form-control"
                value={formData.certificate} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <button type="submit" className={`btn ${isEdit ? "btn-warning" : "btn-gen"} btn-sm w-50 fw-bold`}>
            {isEdit ? "UPDATE" : "CREATE"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FeatureForm;