import { MessageInfo, MessageEdit } from "../../../../api/mixed";
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const MessageCard = () => {
  const [message, setMessage] = useState(null);
  const { mid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await MessageInfo(mid);
        setMessage(response.data);
      } catch (error) {
        console.error("Failed to Fetch Message Details:", error);
      }
    };

    fetchMessage();
  }, [mid]);

  const handleReply = async () => {
    try {
      const updated = !message.replied;
      await MessageEdit(mid, { replied: updated });
      setMessage({ ...message, replied: updated });
      toast.success(`Reply Status Updated to ${updated ? 'Replied' : 'Not Replied'}`);
    } catch (error) {
      console.error("Failed to Update Reply Status:", error);
    }
  };

  if (!message) return (
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
          <h4 className="text-center text-success pb-2">Message Details</h4>
          <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close" onClick={() => navigate(`/admin/messages`)}></button>

          <ul className="border-0 list-group w-100 mb-3">
            <div className="d-flex">
              <li className="list-group-item w-50">👤 Name: {message.name}</li>
              <li className="list-group-item w-50 border-start-0 border-1">📧 Email: {message.email}</li>
            </div>

            <div className="d-flex">
              <li className="list-group-item w-50 border-top-0">📱 Mobile: {message.mobile}</li>
              <li className="list-group-item w-50 border-start-0">🗓️ Date: {formatDate(message.created)}</li>
            </div>

            <li className="list-group-item w-100 border-top-0">🧩 Subject: {message.subject}</li>
            <li className="list-group-item w-100">📋 Message: <p className="ms-1">{message.message}</p></li>

            <div className="d-flex">
              <li className="list-group-item w-50 border-top-0">⏳ Status:
                <span className={`badge ${message.replied ? "bg-success" : "bg-warning"} px-3 ms-2`}>
                  {message.replied ? "Replied" : "Pending"}
                </span>
              </li>

              <li className="list-group-item w-50 border-start-0">🎯 Action:
                <button type="button" onClick={handleReply}
                  className={`${message.replied ? "text-warning" : "text-success"} ms-2 border-0 bg-transparent fw-bold`}>
                  {message.replied ? "Mark as Pending" : "Mark as Replied"}
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MessageCard;