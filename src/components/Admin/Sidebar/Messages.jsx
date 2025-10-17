import useDelete from '../../../hooks/useDelete';
import { MessageList } from "../../../api/mixed";
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await MessageList();
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to Fetch Messages:", error);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  useEffect(() => {
    const tableId = '#messageTable';
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }

    if (messages.length > 0) {
      setTimeout(() => {
        $(tableId).DataTable({ paging: true, info: true, searching: true, ordering: true, });
      }, 0);
    }
  }, [messages]);

  const handleDelete = useDelete('support/messages', setMessages);

  if (!messages) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="container-fluid p-3">
      <h4 className="text-success mb-3">Message List</h4>
      <div className="card p-2">
        <table id="messageTable" className="table table-bordered table-striped table-success table-hover">
          <thead>
            <tr>
              <th className="text-center" width="3%">#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Subject</th>
              <th className="text-center">Status</th>
              <th className="text-center" width="10%">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <tr key={message.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{message.name}</td>
                  <td>{message.mobile}</td>
                  <td>{message.subject}</td>
                  <td className="text-center">
                    <span className={`badge ${message.replied ? "bg-success" : "bg-warning"} px-3 ms-2`}>
                      {message.replied ? "Replied" : "Pending"}
                    </span>
                  </td>
                  <td className="text-center">
                    <Link to={`detail/${message.id}`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(message.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center text-danger">No Messages Found</td></tr>
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

export default Messages;