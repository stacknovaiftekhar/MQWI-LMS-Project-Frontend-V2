import { Link, Outlet, useLocation } from 'react-router';
import { PurposeList } from "../../../../api/mixed";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useDelete from '../../../../hooks/useDelete';

const PurposeCard = () => {
  const [purposes, setPurposes] = useState([]);
  const location = useLocation();

  useEffect(() => { fetchPurposes(); }, []);

  useEffect(() => {
    if (location.state?.reload) fetchPurposes();
  }, [location.state]);

  const fetchPurposes = async () => {
    try {
      const response = await PurposeList();
      setPurposes(response.data);
    } catch (error) {
      console.error("Failed to Fetch Purposes:", error);
    }
  };

  const handleDelete = useDelete('sadaqah/purpose', setPurposes, { onSuccess: fetchPurposes });

  if (!purposes) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-6">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0 text-success">Purpose List</h4>
            <Link to="create" className="btn btn-green btn-sm px-3 fw-bold">Add Purpose</Link>
          </div>

          <table className="table table-bordered table-striped table-success table-hover">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Name in English</th>
                <th>Name in Bangla</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {purposes.length > 0 ? (
                purposes.map((purpose, index) => (
                  <tr key={purpose.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className='hsf'>{purpose.name_en}</td>
                    <td className='hsf'>{purpose.name_bn}</td>
                    <td className="text-center">
                      <Link to={`update/${purpose.id}`} className="btn btn-sm btn-warning me-2"><FaEdit /></Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(purpose.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center text-danger">No Purposes Found</td></tr>
              )}
            </tbody>
          </table>

          <div className="text-center">
            <Link to="/admin/sadaqah" className="btn btn-secondary btn-sm px-3">Back to Sadaqah List</Link>
          </div>
        </div>

        <div className="col-md-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PurposeCard;