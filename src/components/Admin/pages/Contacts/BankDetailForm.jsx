import { BankDetailData, BankDetailMake, BankDetailEdit } from "../../../../api/admin";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BankDetailForm = () => {
  const initialState = { name: "", account: "", bank: "", branch: "" };
  const [formData, setFormData] = useState(initialState);
  const { bid } = useParams();
  const isEdit = !!bid;
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isEdit) fetchBankDetail();
  }, [bid]);

  const fetchBankDetail = async () => {
    try {
      const response = await BankDetailData(bid);
      const bank = response.data;
      setFormData({
        name: bank.name,
        account: bank.account,
        bank: bank.bank,
        branch: bank.branch,
      });
    } catch {
      toast.error("Failed to Fetch Bank Details");
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
        await BankDetailEdit(bid, data);
        toast.success("Bank Details Updated Successfully!");
      } else {
        await BankDetailMake(data);
        toast.success("Bank Details Created Successfully!");
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
          {isEdit ? "UPDATE BANK DETAILS" : "CREATE BANK DETAILS"}
        </h4>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Account Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Account Number</label>
            <input type="text" name="account" className="form-control" value={formData.account} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Bank Name</label>
            <input type="text" name="bank" className="form-control" value={formData.bank} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-4">
            <label className="form-label">Branch Name</label>
            <input type="text" name="branch" className="form-control" value={formData.branch} onChange={handleChange} />
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

export default BankDetailForm;