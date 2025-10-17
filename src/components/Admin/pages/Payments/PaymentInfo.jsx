import { useParams, Link, Outlet } from "react-router";
import { PaymentRead } from "../../../../api/payment";
import { EnrollInfo } from "../../../../api/enroll";
import { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { toast } from "react-toastify";

const PaymentInfo = () => {
  const [enrollment, setEnrollment] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { eid } = useParams();

  const fetchEnrollment = async () => {
    try {
      const response = await EnrollInfo(eid);
      console.log(response.data);
      setEnrollment(response.data);
    } catch (error) {
      console.error("Failed to Fetch Enrollment Info:", error);
      toast.error("Failed to Fetch Enrollment Info!");
    }
  };

  useEffect(() => {
    fetchEnrollment();
    if (eid) {
      PaymentRead(`?enrollment=${eid}`)
        .then((res) => {
          setPayments(res.data);
          setLoading(false);
        });
    }
  }, [eid]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const formatMonth = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };


  return (
    <section className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-success">Payments of <span className="text-primary">{enrollment.student_name}</span></h4>
        <h4 className="text-success">Course: <span className="text-primary abf">{enrollment.course_title}</span></h4>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-success table-hover align-middle text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Payment Type</th>
              <th>Month Name</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  <td>{payment.type}</td>
                  <td>{payment.type === "Monthly" ? formatMonth(payment.month) : "-"}</td>
                  <td>{payment.payment_method}</td>
                  <td>{payment.amount} ৳</td>
                  <td>{formatDate(payment.date)}</td>
                  <td>{payment.txn_id}</td>
                  <td>
                    <span className={`badge px-3 ${payment.status === "Verified" ? "bg-success"
                      : payment.status === "Pending" ? "bg-warning text-dark" : "bg-secondary"}`}>{payment.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <Link to={`${payment.id}/detail`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-danger">No Payments Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div id="outlet-scroll-target">
        <Outlet />
      </div>
    </section>
  );
};

export default PaymentInfo;