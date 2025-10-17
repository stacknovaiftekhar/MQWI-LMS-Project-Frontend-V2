import { WalletInfoData, WalletInfoMake, WalletInfoEdit } from "../../../../api/admin";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WalletInfoForm = () => {
  const initialState = { name: "", number: "" };
  const [formData, setFormData] = useState(initialState);
  const { wid } = useParams();
  const isEdit = !!wid;
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEdit) fetchWalletInfo();
  }, [wid]);

  const fetchWalletInfo = async () => {
    try {
      const response = await WalletInfoData(wid);
      const wallet = response.data;
      setFormData({
        name: wallet.name,
        number: wallet.number,
      });
    } catch {
      toast.error("Failed to Fetch Wallet Info");
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
        await WalletInfoEdit(wid, data);
        toast.success("Wallet Info Updated Successfully!");
      } else {
        await WalletInfoMake(data);
        toast.success("Wallet Info Created Successfully!");
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
          {isEdit ? "UPDATE WALLET INFO" : "CREATE WALLET INFO"}
        </h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Wallet Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-4">
            <label className="form-label">Wallet Number</label>
            <input type="tel" name="number" className="form-control" value={formData.number} onChange={handleChange} />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className={`btn ${isEdit ? "btn-warning" : "btn-gen"} btn-sm w-50`}>
            {isEdit ? "UPDATE" : "CREATE"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default WalletInfoForm;