import { Link, Outlet, useLocation } from 'react-router';
import { TeacherList } from "../../../api/admin";
import { FaEye, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useDelete from '../../../hooks/useDelete';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const location = useLocation();

  useEffect(() => { fetchTeachers(); }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchTeachers();
    }
  }, [location.state]);

  const fetchTeachers = async () => {
    try {
      const response = await TeacherList();
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to Fetch Teachers:", error);
    }
  };

  const handleDelete = useDelete('users/teachers', setTeachers, {
    onSuccess: fetchTeachers,   // onSuccess: () => navigate('/admin/teachers'),
  });

  if (!teachers) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-3">
      <div className="d-flex gap-4 flex-wrap">
        {/* LEFT: Teachers List */}
        <div className="flex-fill" style={{ flexBasis: "60%" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0 text-success">Teacher List</h4>
            <Link to="create" className="btn btn-green btn-sm px-3 fw-bold">Add Teacher</Link>
          </div>

          <table className="table table-bordered table-striped table-success table-hover">
            <thead className="">
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{teacher.fullname}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.username}</td>
                    <td className="text-center">
                      <Link to={`/admin/teachers/detail/${teacher.id}`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(teacher.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center text-danger">No Teachers Found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* RIGHT: Create / Update Form */}
        <div className="" style={{ flexBasis: "40%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Teachers;