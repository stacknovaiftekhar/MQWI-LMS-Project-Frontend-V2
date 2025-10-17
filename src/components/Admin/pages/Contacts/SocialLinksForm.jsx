import { SocialLinksDetail, SocialLinksCreate, SocialLinksUpdate } from "../../../../api/admin";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SocialLinksForm = () => {
  const initialState = { facebook_page: "", facebook_group: "", whatsapp: "",
    youtube: "", twitter: "", linkedin: "", instagram: "", telegram: "" };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit;

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEdit) fetchSocialLinks();
  }, [isEdit]);

  const fetchSocialLinks = async () => {
    try {
      const response = await SocialLinksDetail();
      const social = response.data;
      setFormData({
        facebook_page: social.facebook_page,
        facebook_group: social.facebook_group,
        whatsapp: social.whatsapp,
        youtube: social.youtube,
        twitter: social.twitter,
        linkedin: social.linkedin,
        instagram: social.instagram,
        telegram: social.telegram,
      });
    } catch {
      toast.error("Failed to Fetch Social Links");
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
        await SocialLinksUpdate(data);
        toast.success("Social Links Updated Successfully!");
      } else {
        try {
          await SocialLinksCreate(data);
          toast.success("Social Links Created Successfully!");
        } catch (err) {
          if (err.response?.data?.detail?.includes("Already Exists")) {
            toast.error("Social Links Already Exists!");
          } else {
            toast.error("Failed to Create Social Links!");
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
          {isEdit ? "UPDATE SOCIAL LINKS" : "CREATE SOCIAL LINKS"}
        </h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Facebook Page Link</label>
            <input type="url" name="facebook_page" className="form-control" value={formData.facebook_page} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Facebook Group Link</label>
            <input type="url" name="facebook_group" className="form-control" value={formData.facebook_group} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">WhatsApp Number Link</label>
            <input type="url" name="whatsapp" className="form-control" value={formData.whatsapp} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">YouTube Channel Link</label>
            <input type="url" name="youtube" className="form-control" value={formData.youtube} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Twitter Profile Link</label>
            <input type="url" name="twitter" className="form-control" value={formData.twitter} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Linkedin Profile Link</label>
            <input type="url" name="linkedin" className="form-control" value={formData.linkedin} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Instagram Profile Link</label>
            <input type="url" name="instagram" className="form-control" value={formData.instagram} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-4">
            <label className="form-label">Telegram Channel Link</label>
            <input type="url" name="telegram" className="form-control" value={formData.telegram} onChange={handleChange} />
          </div>
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

export default SocialLinksForm;