import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { CourseList } from "../../../api/course";
import useDelete from '../../../hooks/useDelete';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  
  useEffect(() => { fetchCourses(); }, []);
  
  useEffect(() => {
    if (location.state?.reload) {
      fetchCourses();
    }
  }, [location.state]);
  
  const fetchCourses = async () => {
    try {
      const response = await CourseList();
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to Fetch Courses:", error);
    }
  };

  const handleDelete = useDelete('courses/courses', setCourses, { onSuccess: fetchCourses });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!courses) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  return (
    <div className="container-fluid p-3">
      <div className="course-list mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-success mb-0">Course List</h4>
          <Link to="create" className="btn btn-green btn-sm px-3 fw-bold">Create Course</Link>
        </div>

        <table className="table table-bordered table-striped table-success table-hover">
          <thead className="table-success">
            <tr>
              <th className="text-center" style={{ width: '5%' }}>#</th>
              <th className="text-center" style={{ width: '10%' }}>Thumbnail</th>
              <th>Course Title</th>
              <th>Instructor</th>
              <th>Start Date</th>
              <th className="text-center" style={{ width: '15%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length ? courses.map((course, index) => (
              <tr key={course.id}>
                <td className="text-center align-middle">{index + 1}</td>
                <td className="align-middle text-center">
                  <img src={course.thumbnail} alt={course.title} className="img-fluid"
                    style={{ maxHeight: '45px', objectFit: 'cover' }} />
                </td>
                <td className="align-middle hsf">{course.title}</td>
                <td className="align-middle hsf">{course.teacher_name_bn}</td>
                <td className="align-middle hsf">{formatDate(course.start_date)}</td>
                <td className="text-center align-middle">
                  <Link to={`detail/${course.id}`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                  <Link to={`update/${course.id}`} className="btn btn-sm btn-warning me-2"><FaEdit /></Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course.id)}><FaTrash /></button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center text-danger">No Courses Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;