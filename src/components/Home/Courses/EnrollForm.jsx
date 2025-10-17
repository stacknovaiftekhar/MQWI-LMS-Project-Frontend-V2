import { convertDigits } from '../../../utilities/bnDigits';
import { method as Methods } from "../../../assets/assets";
import Instructions from "../../../utilities/Instructions";
import { useLocation, useNavigate } from "react-router";
import { PaymentMake } from "../../../api/payment";
import { IsEnrolled } from "../../../api/enroll";
import useSelect from "../../../hooks/useSelect";
import { useEffect, useState } from "react";
import Heading from "../../Heading/Heading";
import Layout from '../../Layout/Layout';
import { toast } from "react-toastify";

const EnrollForm = () => {
  const [formData, setFormData] = useState({ method: "", object: "", txn_id: "" });
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);

  const { wallets, banks, loading } = useSelect();
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;
  const student = JSON.parse(localStorage.getItem("user"));

  // Message
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchIsEnrolled = async () => {
      try {
        const response = await IsEnrolled(course.id);
        if (response.data.enrolled) { setIsEnrolled(true); }
      } catch (error) {
        console.error("Error Checking Enrollment Status:", error);
      }
    };

    fetchIsEnrolled();
  }, [course]);

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
      course: course.id,
      type: "Registration",
      amount: course?.features?.enrollment,
    };

    try {
      await PaymentMake(payload);
      toast.success("Payment Submitted! Please wait for Approval.");
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

  if (!course || !student) {
    navigate("/");
    return <h2 className="text-center text-danger my-5">Invalid Course or Student Information</h2>;
  }

  return (
    <Layout>
      <Heading title="নিবন্ধন" current="নিবন্ধন" />
      <section className="enroll-form">
        <div className="container-fluid">
          <div className="container py-5">
            <h3 className="text-center text-success text-uppercase mb-4">Course Enrollment Payment</h3>

            {isEnrolled && (
              <div className="alert alert-warning alert-dismissible shadow fade show text-center mb-4" role="alert">
                <h5 className="text-uppercase mt-2">You are Already Enrolled in this Course</h5>
                <h5 className="hsf">আপনি ইতিমধ্যেই এই কোর্সটিতে নিবন্ধিত হয়েছেন</h5>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}

            {/* Form Card */}
            <div className="card shadow border p-4 mb-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  {/* Thumbnail */}
                  <div className="col-xxl-2 col-lg-3 col-sm-6 col-12 text-center text-sm-start">
                    <img src={course.thumbnail} alt={course.title} className="img-fluid rounded" style={{ maxWidth: "190px" }} />
                  </div>

                  {/* Course Info */}
                  <div className="col-xxl-3 col-lg-3 col-sm-6 col-12">
                    <h4 className="abf abb mb-4">{course.title}</h4>
                    <h6 className="abf mb-3"><small>🌟&nbsp;</small> Payment Type: &nbsp;Registration</h6>
                    <h6 className="abf"><small>💸&nbsp;</small> নিবন্ধন-ফি: &nbsp;{convertDigits(course.features?.enrollment)} টাকা।</h6>
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
                    {/* {selectedLabel && (
                      <small className="text-muted d-block mt-2">Selected: {selectedLabel}</small>
                    )} */}
                  </div>

                  {/* Transaction ID */}
                  <div className="col-xxl-3 col-lg-3 col-sm-6 col-12">
                    <label className="form-label">Transaction ID *</label>
                    <input type="text" name="txn_id" className="form-control" value={formData.txn_id} onChange={handleChange} required />

                    <div className="text-center mt-3">
                      <button type="submit" className="btn btn-success btn-sm px-4">SUBMIT</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Instructions Component */}
            <Instructions selectedWallet={selectedWallet} selectedBank={selectedBank} selectedColor={selectedColor} course={course} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EnrollForm;