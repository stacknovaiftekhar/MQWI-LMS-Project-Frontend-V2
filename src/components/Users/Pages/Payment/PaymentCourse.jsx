import Loading from "../../../../utilities/Loading";
import { EnrollList } from "../../../../api/enroll";
import { Link, Outlet } from "react-router";
import { useEffect, useState } from "react";

const PaymentCourse = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await EnrollList();
        setEnrollments(response.data);
      } catch (error) {
        console.error("Failed to Fetch Enrolled Courses:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="container mt-5">
      <h5 className="text-success mb-3">Select a Course for Monthly Payment</h5>

      <div className="row">
        {enrollments.map((enroll) => {
          const course = enroll?.course;
          if (!course) return null;

          return (
            <div key={enroll.id} className="col-xl-4 col-md-6 mb-2">
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-1">
                  <img src={course.thumbnail} alt={course.title} style={{ width: "64px" }} />
                  <h6 className="text-success hsf mb-0">{course.title}</h6>
                  <Link to={`${enroll.id}`} state={{ course }} className="btn btn-outline-success btn-sm px-2 hsf">পেমেন্ট করুন</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div id="outlet-scroll-target" className="mt-4">
        <Outlet />
      </div>
    </section>
  );
};

export default PaymentCourse;