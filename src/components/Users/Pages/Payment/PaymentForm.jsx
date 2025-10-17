import { useLocation, useNavigate, useParams } from "react-router";
import { convertDigits } from '../../../../utilities/bnDigits';
import { method as Methods } from "../../../../assets/assets";
import Instructions from "../../../../utilities/Instructions";
import { PaymentMake } from "../../../../api/payment";
import useSelect from "../../../../hooks/useSelect";
import { toast } from "react-toastify";
import { useState } from "react";

const PaymentForm = () => {
  const [formData, setFormData] = useState({ month: "", method: "", object: "", txn_id: "" });
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  const { wallets, banks, loading } = useSelect();
  const location = useLocation();
  const navigate = useNavigate();

  const { eid } = useParams();
  const course = location.state?.course;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentSelect = (key) => {
    let method = "", object = "";

    if (["Bkash", "Nagad", "Rocket"].includes(key)) {
      const wallet = wallets.find(w => w.name === key);
      if (wallet) {
        method = "wallet";
        object = wallet.id;
        setSelectedWallet(wallet);
        setSelectedBank(null);
      }
    } else if (key === "Islami") {
      const bank = banks.find(b => b.bank.includes("Islami"));
      if (bank) {
        method = "bank";
        object = bank.id;
        setSelectedBank(bank);
        setSelectedWallet(null);
      }
    }

    setFormData(prev => ({ ...prev, method, object }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      enrollment: eid,
      type: "Monthly",
      amount: course?.features?.tuition,
    };

    try {
      await PaymentMake(payload);
      toast.success("Payment Submitted! Please wait for Verification.");
      navigate("/dashboard/payment", { state: { reload: true } });
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Payment Submission Failed!");
    }
  };

  const methodColors = { Bkash: "#CF2772", Nagad: "#C90008", Rocket: "#89288F", Islami: "#224A23" };
  const selectedMethod = selectedWallet?.name || (selectedBank ? "Islami" : null);
  const selectedColor = methodColors[selectedMethod] || "#F5F5F5";

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="payment-form">
      {/* Form Card */}
      <div className="card shadow border p-4 mb-4">
        <h5 className="text-center text-success text-uppercase mb-4">Monthly Course Payment</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Thumbnail */}
            <div className="col-xxl-2 col-lg-3 col-sm-6 col-12 text-center text-sm-start">
              <img src={course.thumbnail} alt={course.title} className="img-fluid rounded" style={{ maxWidth: "190px" }} />
            </div>

            {/* Course Info */}
            <div className="col-xxl-3 col-lg-3 col-sm-6 col-12">
              <h4 className="abf abb mb-3">{course.title}</h4>
              <h6 className="abf mb-3"><small>🌟&nbsp;</small> Payment Type: &nbsp;Monthly</h6>
              <h6 className="abf"><small>💸&nbsp;</small> মাসিক-ফি: &nbsp;{convertDigits(course.features?.tuition)} টাকা।</h6>
            </div>

            {/* Payment Method */}
            <div className="col-xxl-4 col-lg-3 col-sm-6 col-12">
              <label className="form-label">Select Payment Method:</label>
              <div className="d-flex flex-wrap gap-2">
                {Object.entries(Methods).map(([key, icon]) => {
                  const isSelected = selectedMethod === key;
                  return (
                    <div key={key} onClick={() => handlePaymentSelect(key)} style={{
                      cursor: "pointer", padding: "4px",
                      border: isSelected ? `3px double ${methodColors[key]}` : "1px solid #ccc", borderRadius: "8px"
                    }}>
                      <img src={icon} alt={key} width={70} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transaction ID */}
            <div className="col-xxl-3 col-lg-3 col-sm-6 col-12">
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">Select Month</label>
                <div className="col-sm-7">
                  <input type="month" name="month" className="form-control" value={formData.month} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-5 col-form-label">Transaction ID</label>
                <div className="col-sm-7">
                  <input type="text" name="txn_id" className="form-control" value={formData.txn_id} onChange={handleChange} required />
                </div>
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success btn-sm px-4">SUBMIT</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Instructions Component */}
      <Instructions selectedWallet={selectedWallet} selectedBank={selectedBank} selectedColor={selectedColor} course={course} />
    </section>
  );
};

export default PaymentForm;