import { PaymentInfo, PaymentVerify, PaymentVoid, InvoiceVoid } from "../../../../api/payment";
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PaymentCard = () => {
  const [payment, setPayment] = useState(null);
  const { pid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await PaymentInfo(pid);
        setPayment(response.data);
      } catch (error) {
        console.error("Failed to Fetch Payment Details:", error);
      }
    };

    fetchPayment();
  }, [pid]);

  const handleVerify = async () => {
    try {
      const newStatus = payment.status === 'Verified' ? 'Pending' : 'Verified';
      // await PaymentEdit(payment.id, { status: newStatus });
      const response = await PaymentVerify(payment.id, { status: newStatus });
      console.log(response);
      setPayment({ ...payment, status: newStatus });
      toast.success(`Payment Status Updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update payment status:", error);
      toast.error("Failed to Update Payment Status");
    }
  };

  const handleDeletePayment = async () => {
    if (!window.confirm("Are you sure you want to delete this Payment?")) return;
    try {
      await PaymentVoid(payment.id);
      toast.success("Payment Deleted Successfully");
      navigate("/admin/payments", { state: { reload: true } });
    } catch (error) {
      console.error("Failed to Delete Payment:", error);
      toast.error("Failed to Delete Payment");
    }
  };

  const handleDeleteInvoice = async () => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) return;
    try {
      await InvoiceVoid(payment.invoice?.id);
      toast.success("Invoice Deleted Successfully");
      setPayment({ ...payment, invoice: null });
    } catch (error) {
      console.error("Failed to Delete Invoice:", error);
      toast.error("Failed to Delete Invoice");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  if (!payment) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="mt-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="card shadow position-relative p-3">
          <h4 className="text-center text-success mb-3">Payment & Invoice Details</h4>

          <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close" onClick={() => navigate(`../`)}></button>

          <div className="row border m-0">
            <div className="col-lg-6 border py-2">🧩 Course Title:
              <span className="ms-2 hsf">{payment.enrollment_info?.course}</span>
            </div>
            <div className="col-lg-6 border py-2">👤 Student Name:
              <span className="ms-2">{payment.enrollment_info?.student}</span>
            </div>
            <div className="col-lg-6 border py-2">📋 Payment Type:
              <span className="ms-2">{payment.type}</span>
            </div>
            <div className="col-lg-6 border py-2">📅 Month Name:
              <span className="ms-2">{payment.month || 'N/A'}</span>
            </div>
            <div className="col-lg-6 border py-2">🏦 Payment Method:
              <span className="ms-2">{payment.payment_method}</span>
            </div>
            <div className="col-lg-6 border py-2">📝 Transaction ID:
              <span className="ms-2">{payment.txn_id}</span>
            </div>
            <div className="col-lg-6 border py-2">💵 Paid Amount:
              <span className="ms-2">{payment.amount}</span>
            </div>
            <div className="col-lg-6 border py-2">📆 Payment Date:
              <span className="ms-2">{formatDate(payment.date)}</span>
            </div>

            <div className="col-lg-6 border py-2">🧾 Invoice Number:
              <span className="ms-2">{payment.invoice?.number || 'N/A'}</span>
            </div>
            <div className="col-lg-6 border py-2">🗓️ Invoice Issued:
              <span className="ms-2">{formatDate(payment.invoice?.issued) || 'N/A'}</span>
            </div>

            <div className="col-md-6 border py-2">⏳ Payment Status:
              <span className={`badge ms-2 ${payment.status === 'Verified' ? "bg-success" : "bg-warning"}`}>{payment.status}</span>
              <button className={`ms-3 btn btn-sm ${payment.status === 'Verified' ? "btn-outline-warning" : "btn-outline-success"}`}
                onClick={handleVerify}>{payment.status === 'Verified' ? "Mark as Pending" : "Mark as Verified"}</button>
            </div>

            <div className="col-md-6 d-flex border py-2">🎯 Actions:
              <div className="ms-2 d-flex gap-2">
                <button className="btn btn-sm btn-outline-danger" onClick={handleDeletePayment}>🗑️ Delete Payment</button>
                {payment.invoice &&
                  <button className="btn btn-sm btn-outline-secondary" onClick={handleDeleteInvoice}>🧾 Delete Invoice</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentCard;