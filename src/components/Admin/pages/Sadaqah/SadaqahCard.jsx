import { SadaqahInfo, SadaqahEdit } from "../../../../api/mixed";
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SadaqahCard = () => {
  const [sadaqah, setSadaqah] = useState(null);
  const { sid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchSadaqah = async () => {
      try {
        const response = await SadaqahInfo(sid);
        setSadaqah(response.data);
      } catch (error) {
        console.error("Failed to Fetch Sadaqah Details:", error);
      }
    };

    fetchSadaqah();
  }, [sid]);

  const handleReceive = async () => {
    try {
      const updated = !sadaqah.received;
      await SadaqahEdit(sid, { received: updated });
      setSadaqah({ ...sadaqah, received: updated });
      toast.success(`Receive Status Updated to ${updated ? 'Received' : 'Not Received'}`);
    } catch (error) {
      console.error("Failed to Update Receive Status:", error);
    }
  };

  if (!sadaqah) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <section className="mt-4">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="card shadow position-relative w-100 p-3">

          <h4 className="text-center text-success pb-2">Sadaqah Details of -
            <span className="text-warning ms-1">👤 {sadaqah.name}</span></h4>
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close" onClick={() => navigate(`/admin/sadaqah`)}></button>

          <ul className="border-0 list-group w-100 mb-3 hsf">
            <div className="d-flex">
              <li className="list-group-item w-50">📧 Email: {sadaqah.email}</li>
              <li className="list-group-item w-50 border-start-0 border-1">📱 Mobile: {sadaqah.mobile}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-50 border-top-0">📋 Category: {sadaqah.category_name}</li>
              <li className="list-group-item w-50 border-start-0">🧩 Purpose: {sadaqah.purpose_name_bn}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-50 border-top-0">🏦 Method: {sadaqah.payment_method}</li>
              <li className="list-group-item w-50 border-start-0">📝 Transaction ID: {sadaqah.txn_id}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-50 border-top-0">💵 Amount: {sadaqah.amount}</li>
              <li className="list-group-item w-50 border-start-0">🗓️ Date: {formatDate(sadaqah.created_at)}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-50 border-top-0">⏳ Status:
                <span className={`badge ${sadaqah.received ? "bg-success" : "bg-warning"} px-3 ms-2`}>
                  {sadaqah.received ? "Received" : "Pending"}
                </span>
              </li>
              <li className="list-group-item w-50 border-start-0">🎯 Action:
                <button type="button" onClick={handleReceive}
                  className={`${sadaqah.received ? "text-warning" : "text-success"} ms-2 border-0 bg-transparent fw-bold`}>
                  {sadaqah.received ? "Mark as Pending" : "Mark as Received"}
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SadaqahCard;