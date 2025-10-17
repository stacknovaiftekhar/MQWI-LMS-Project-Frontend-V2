import { convertDigits } from '../../../utilities/bnDigits';
import { CourseList } from "../../../api/course";
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Course = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await CourseList();
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to Fetch Courses:", error);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  if (!courses) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="row">
      {courses.length ? courses.map((course, index) => (
        <div className="col-xl-3 col-md-6 mb-3" key={course.id}>
          <div className="card text-center">
            <div className="card-img">
              <img src={course.thumbnail} alt={course.title} />
            </div>
            <div className="card-body hsf">
              <h5 className="card-title text-success hsf hss">{course.title}</h5>
              <p className="card-text text-justify">{course.short_desc}</p>
              <p className="fee"><b>মাসিক-ফি: {convertDigits(course.features?.tuition)} টাকা</b></p>
              <Link to={`/courses/${course.id}/${course.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="btn btn-gen w-75"><span>বিস্তারিত দেখুন</span></Link>
            </div>
          </div>
        </div>
      )) : (
        <div>
          <h6 className="text-center text-danger">No Courses Found</h6>
        </div>
      )}
    </div>
  )
}

export default Course;




    
