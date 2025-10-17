import useDelete from '../../../hooks/useDelete';
import { SadaqahList } from "../../../api/mixed";
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const Sadaqah = () => {
  const [sadaqah, setSadaqah] = useState([]);

  const fetchSadaqah = async () => {
    try {
      const response = await SadaqahList();
      setSadaqah(response.data);
    } catch (error) {
      console.error("Failed to Fetch Sadaqah List:", error);
    }
  };

  useEffect(() => { fetchSadaqah(); }, []);

  useEffect(() => {
    const tableId = '#sadaqahTable';
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }

    if (sadaqah.length > 0) {
      setTimeout(() => {
        $(tableId).DataTable({ paging: true, info: true, searching: true, ordering: true, });
      }, 0);
    }
  }, [sadaqah]);

  const handleDelete = useDelete('sadaqah/sadaqah', setSadaqah);

  if (!sadaqah) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 text-success">Sadaqah List</h4>
        <Link to="purpose" className="btn btn-info btn-sm px-3 fw-bold">View Purposes</Link>
      </div>
      <div className="card p-2">
        <table id="sadaqahTable" className="hsf table table-bordered table-striped table-success table-hover">
          <thead>
            <tr>
              <th className="text-center" width="3%">#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Category</th>
              <th>Purpose</th>
              <th className="text-end">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center" width="10%">Action</th>
            </tr>
          </thead>
          <tbody>
            {sadaqah.length > 0 ? (
              sadaqah.map((sadaqa, index) => (
                <tr key={sadaqa.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{sadaqa.name}</td>
                  <td>{sadaqa.mobile}</td>
                  <td>{sadaqa.category_name}</td>
                  <td>{sadaqa.purpose_name_bn}</td>
                  <td className="text-end">{sadaqa.amount}</td>
                  <td className="text-center">
                    <span className={`badge ${sadaqa.received ? "bg-success" : "bg-warning"} px-3 ms-2`}>
                      {sadaqa.received ? "Received" : "Pending"}
                    </span>
                  </td>
                  <td className="text-center">
                    <Link to={`detail/${sadaqa.id}`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(sadaqa.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" className="text-center text-danger">No Sadaqah Entry Found</td></tr>
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

export default Sadaqah;