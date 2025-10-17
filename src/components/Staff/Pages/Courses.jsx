import axiosInstance from "../../../utilities/axiosInstance";
import Loading from "../../../utilities/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const tid = JSON.parse(localStorage.getItem("user"))?.id;
// DONE

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axiosInstance.get(`/courses/courses/?teacher=${tid}`);
        setCourses(data);
      } catch (error) {
        console.error("Failed to Fetch Courses:", error);
        toast.error("Failed to Load Courses");
      } finally {
        setLoading(false);
      }
    };

    if (tid) fetchCourses();
  }, [tid]);

  if (loading) return <Loading />;

  if (!courses.length) {
    return <p className="text-center text-muted">No Courses Found!</p>;
  }

  return (
    <section>
      <h2 className="text-center text-success text-uppercase mb-4">My Assigned Courses</h2>

      <div className="row justify-content-center">
        {courses.map(({ id, title, thumbnail }) => (
          <div key={id} className="col-md-3 mb-4">
            <div className="card shadow text-center h-100">
              <img src={thumbnail} alt={title} className="card-img-top" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title text-success hsf mb-3">{title}</h4>
                <Link to={`${id}/modules`} className="btn btn-outline-success btn-sm px-3 mt-auto hsf">কোর্সে প্রবেশ করুন</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;