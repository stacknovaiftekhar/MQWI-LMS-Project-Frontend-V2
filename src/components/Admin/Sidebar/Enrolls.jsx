import { EnrollList, EnrollVoid } from "../../../api/enroll";
import { useNavigate, Link } from "react-router";
import { FaEye, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import $ from "jquery";

const Enrolls = () => {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchEnrollments(); }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await EnrollList();
      setEnrollments(res.data);
    } catch (err) {
      toast.error("Failed to Fetch Enrollments");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure You Want To Delete This Enrollment?")) {
      try {
        await EnrollVoid(id);
        toast.success("Enrollment Deleted Successfully!");
        fetchEnrollments();
      } catch (err) {
        toast.error("Failed to Delete Enrollment!");
      }
    }
  };

  useEffect(() => {
    const tableId = "#enrollmentTable";
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }

    if (enrollments.length > 0) {
      setTimeout(() => {
        $(tableId).DataTable({ paging: true, info: true, searching: true, ordering: true, responsive: true });
      }, 0);
    }
  }, [enrollments]);

  if (!enrollments) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  return (
    <section className="container-fluid p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 text-success">Enrollment List</h4>
        <Link to="/admin/payments" className="btn btn-info btn-sm px-3 fw-bold">View All Payments</Link>
      </div>
      
      <div className="table-responsive card p-2">
        <table id="enrollmentTable" className="table table-bordered table-striped table-success table-hover align-middle">
          <thead>
            <tr>
              <th width="3%">#</th>
              <th>Student Name</th>
              <th>Course Title</th>
              <th>Enrolled Date</th>
              <th>Status</th>
              <th>Payments</th>
              <th width="10%">Remove</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((enroll, index) => (
                <tr key={enroll.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td>{enroll.student_name}</td>
                  <td className="hsf">{enroll.course_title}</td>
                  <td>{formatDate(enroll.enrolled_at)}</td>
                  <td className="text-center">
                    <span className={`badge px-3 ${enroll.status === "Enrolled" ? "bg-success"
                      : enroll.status === "Pending" ? "bg-warning text-dark"
                      : enroll.status === "Cancelled" ? "bg-danger" : "bg-secondary"}`}>{enroll.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {/* <button className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`${enroll.id}/payments`)}><FaEye /></button> */}
                    <Link to={`${enroll.id}/payment`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(enroll.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center text-danger">No Enrollment Entry Found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Enrolls;