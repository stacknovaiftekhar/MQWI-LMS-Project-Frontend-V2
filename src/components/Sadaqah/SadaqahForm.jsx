import { useNavigate, useLocation } from "react-router";
import { SadaqahMake } from "../../api/mixed";
import { method } from '../../assets/assets';
import { useState, useEffect } from "react";
import { logo } from '../../assets/assets';
import { toast } from "react-toastify";
import useSelect from "../../hooks/useSelect";

const SadaqahForm = () => {
  const initialState = { name: "", email: "", mobile: "", amount: "", category: "", purpose: "", method: "", object: "", txn_id: "" };
  const [formData, setFormData] = useState(initialState);
  const { purposes, wallets, banks, loading } = useSelect();
  const bkashNumber = wallets.find(w => w.name === "Bkash")?.number;
  const nagadNumber = wallets.find(w => w.name === "Nagad")?.number;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.reload) setFormData(initialState);
  }, [location.state?.reload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    const selected = e.target.options[e.target.selectedIndex];
    const method = selected.getAttribute("data-type");
    const object = e.target.value;
    setFormData(prev => ({ ...prev, method, object }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SadaqahMake(formData);
      toast.success("Sadaqah Submitted Successfully!");
      setFormData(initialState);
      navigate('/sadaqah', { state: { reload: true } });
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to Submit Sadaqah!");
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="sadaqah-form">
      {/* Payment Method */}
      {/* 🕌 */}
      <div className="container-fluid" style={{ background: "#EAFAF1" }}>
        <div className="container py-5">
          <div className="row method">
            <div className="col-md-3 col-6 text-center mb-5 mb-md-0">
              <img src={method.Bkash} alt="Logo of Bkash" className="img-fluid" />
              <h6>{bkashNumber || "01723-234567"}</h6>
              <small>( Send Money )</small>
            </div>
            <div className="col-md-3 col-6 text-center">
              <img src={method.Nagad} alt="Logo of Nagad" className="img-fluid" />
              <h6>{nagadNumber || "01723-234567"}</h6>
              <small>( Send Money )</small>
            </div>
            <div className="col-md-3 col-6 text-center">
              <img src={method.Rocket} alt="Logo of Rocket" className="img-fluid" />
              <h6>{wallets.find(w => w.name === "Rocket")?.number || "01723-234567"}</h6>
              <small>( Send Money )</small>
            </div>
            <div className="col-md-3 col-6 text-center">
              <img src={method.Islami} alt="Logo of Islami Bank" className="img-fluid" />
              <h6>{banks.find(b => b.bank === "Islami Bank")?.account || "01723-234567"}</h6>
              <small>( Bank Transfer )</small>
            </div>
          </div>
        </div>
      </div>

      {/* Sadaqah Form */}
      <div className="container-fluid" style={{ background: "#F2F8F5" }}>
        <div className="container py-5">
          <div className="row">
            {/* Left Part with Logo */}
            <div className="col-lg-5 d-lg-flex d-none">
              <div className="card shadow d-none d-md-flex align-items-center justify-content-center w-100">
                <img src={logo.MainLogo} alt="Main Logo" className="img-fluid p-2" style={{ maxWidth: "420px" }} />
              </div>
            </div>

            {/* Right Part with Form */}
            <div className="col-lg-7 d-flex">
              <div className="justify-content-center align-items-center w-100">
                <form onSubmit={handleSubmit} className="shadow border rounded bg-white p-4 abf">
                  <h3 className="text-center text-success mb-4 abf">সাদাকাহ ফর্ম</h3>

                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">পূর্ণ নাম *</label>
                      <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">ই-মেইল</label>
                      <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">মোবাইল নাম্বার *</label>
                      <input type="text" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} required />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">অনুদানের পরিমাণ *</label>
                      <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">ক্যাটাগরি *</label>
                      <select name="category" className="form-select" value={formData.category} onChange={handleChange} required>
                        <option value="">-- Select Category --</option>
                        <option value="sadaqah">সাদাকাহ</option>
                        <option value="zakat">যাকাত</option>
                      </select>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">অনুদানের খাত *</label>
                      <select name="purpose" className="form-select hsf" value={formData.purpose} onChange={handleChange} required>
                        <option value="">-- Select Purpose --</option>
                        {purposes.map(p => (<option key={p.id} value={p.id}>{p.name_bn}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">প্রদানের মাধ্যম *</label>
                      <select name="content" className="form-select" value={formData.object} onChange={handleSelect} required>
                        <option value="">-- Select Method --</option>
                        {wallets.map(w => (<option key={`wallet-${w.id}`} value={w.id} data-type="wallet">{w.name} - {w.number}</option>))}
                        {banks.map(b => (<option key={`bank-${b.id}`} value={b.id} data-type="bank">{b.bank} - {b.account}</option>))}
                      </select>
                    </div>
                    <div className="col-sm-6 mb-4">
                      <label className="form-label">ট্রান্সঅ্যাকশন আইডি/অ্যাকাউন্ট *</label>
                      <input type="text" name="txn_id" className="form-control" value={formData.txn_id} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-gen btn-sm w-50">SUBMIT</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SadaqahForm;