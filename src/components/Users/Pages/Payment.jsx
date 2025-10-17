import { PaymentList } from "../../../api/payment";
import Loading from "../../../utilities/Loading";
import { useLocation, Link } from "react-router";
import { useEffect, useState } from "react";
const Payment = () => {
  const student = JSON.parse(localStorage.getItem("user"));
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchPayments();
  }, [location.state?.reload]);

  const fetchPayments = async () => {
    try {
      const response = await PaymentList();
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to Fetch Payments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const formatMonth = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <section className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-success">Payments of {student.fullname}</h4>
        <Link to="enrolls" state={{ enroll: payments[0]?.enrollment }}
          className="btn btn-green btn-sm px-3 fw-bold">Make Payment</Link>
      </div>

      {payments.some(payment => payment.status === "Pending") && (
        <div className="alert alert-warning alert-dismissible shadow fade show text-center mb-4" role="alert">
          <h5 className="text-uppercase mt-2">Your Payment is being Processed, Please Wait...</h5>
          <h5 className="hsf">আপনার পেমেন্ট প্রক্রিয়াধীন রয়েছে, অনুগ্রহ করে অপেক্ষা করুন...</h5>
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Payment Type</th>
              <th>Month Name</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  <td className="hsf">{payment.enrollment_info?.course}</td>
                  <td>{payment.type}</td>
                  <td>{payment.type === "Monthly" ? formatMonth(payment.month) : "-"}</td>
                  <td>{payment.payment_method}</td>
                  <td>{payment.amount}</td>
                  <td>
                    <span className={`badge px-3 ${payment.status === "Verified" ? "bg-success"
                      : payment.status === "Pending" ? "bg-warning text-dark" : "bg-secondary"}`}>{payment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-danger">No Payments Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Payment;