import { Link, Outlet, useLocation } from 'react-router';
import { StudentList } from "../../../api/admin";
import { FaEye, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import useDelete from '../../../hooks/useDelete';
import $ from 'jquery';

const Students = () => {
  const [students, setStudents] = useState([]);
  const location = useLocation();

  useEffect(() => { fetchStudents(); }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchStudents();
    }
  }, [location.state]);

  const fetchStudents = async () => {
    try {
      const response = await StudentList();
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to Fetch Students:", error);
    }
  };

  useEffect(() => {
    if (students.length > 0) {
      // Wait for DOM to update
      setTimeout(() => {
        // Option-2: Check if DataTable is Already Initialized
        if ($.fn.DataTable.isDataTable('#studentsTable')) {
          $('#studentsTable').DataTable().destroy(); // Destroy existing instance
        }

        // Initialize DataTable again
        $('#studentsTable').DataTable({
          // Optional: You can add config here
          paging: true,
          searching: true,
          ordering: true,
        });
      }, 0);
    }
  }, [students]);

  const handleDelete = useDelete('users/students', setStudents, {
    onSuccess: fetchStudents,   // onSuccess: () => navigate('/admin/students'),
  });

  if (!students) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-3">
      {/* Students List */}
      <h4 className="text-success mb-3">Student List</h4>
      <div className="card p-2">
        <table id="studentsTable" className="table table-bordered table-striped table-success table-hover">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Occupation</th>
              <th>Designation</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{student.fullname}</td>
                  <td>{student.email}</td>
                  <td>{student.username}</td>
                  <td>{student.occupation}</td>
                  <td>{student.designation}</td>
                  <td className="text-center">
                    <Link to={`/admin/students/detail/${student.id}`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(student.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center text-danger">No Students Found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Student Detail */}
      <div id="outlet-scroll-target" className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Students;