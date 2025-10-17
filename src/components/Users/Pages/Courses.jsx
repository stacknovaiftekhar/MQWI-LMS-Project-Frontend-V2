import axiosInstance from "../../../utilities/axiosInstance";
import Loading from "../../../utilities/Loading";
import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Courses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/enrolls/enrolls/");
        // Handle Both Paginated and Plain List
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setEnrollments(data);
      } catch (err) {
        console.error("Failed to Fetch Enrolled Courses:", err);
        toast.error("Failed to Load Enrolled Courses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const calculateCourseProgress = (course) => {
    const modules = Array.isArray(course?.modules) ? course.modules : [];
    const lessons = modules.flatMap((m) => Array.isArray(m.lessons) ? m.lessons : []);
    const total = lessons.length;
    if (total === 0) return 0;
    const done = lessons.filter((l) => l.completed).length;
    return Math.round((done / total) * 100);
  };

  if (loading) return <Loading />;

  if (!Array.isArray(enrollments) || enrollments.length === 0) {
    return <p className="text-center text-danger mt-5">No Enrolled Courses Found!</p>;
  }

  return (
    <section className="container mt-5">
      <h2 className="text-center text-success text-uppercase mb-4">My Enrolled Courses</h2>

      <div className="row justify-content-center">
        {enrollments.map((enroll) => {
          const course = enroll?.course;
          if (!course) return null;

          const progress = calculateCourseProgress(course);

          return (
            <div key={enroll.id} className="col-md-3 mb-4">
              <div className="card shadow text-center">
                <img src={course.thumbnail || "/placeholder.png"} alt={course.title || "Course"} className="card-img-top" />
                <div className="card-body">
                  <h4 className="card-title text-success hsf">{course.title}</h4>

                  <ProgressBar now={progress} label={`${progress}%`} variant="success" animated className="my-3" />

                  <Link to={`${course.id}/${course.title.replace(/\s+/g, "-")}`} state={{ course }}
                    className="btn btn-outline-success btn-sm px-3 mb-1 hsf">কোর্সে প্রবেশ করুন</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Courses;