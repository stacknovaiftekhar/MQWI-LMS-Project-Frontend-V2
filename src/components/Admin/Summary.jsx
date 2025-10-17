import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  FaChalkboardTeacher, FaUserGraduate, FaBook, FaNewspaper, FaUserPlus,
  FaMoneyBillAlt, FaEnvelope, FaHandHoldingHeart
} from "react-icons/fa";
import axiosInstance from "../../utilities/axiosInstance";
import Loading from "../../utilities/Loading";
import { Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Reusable Card Component
const SummaryCard = ({ to, icon: Icon, iconColor, title, total, pending, amount }) => (
  <div className="card shadow-sm text-center bg-green12 p-4 h-100">
    <Link to={to} className="d-flex justify-content-center align-items-center mb-3">
      <Icon size={28} className={`${iconColor} me-3`} />
      <h5 className="mb-0 text-dark">{title}</h5>
    </Link>
    <h6 className="text-muted">
      Total {title}: <span className={iconColor}>{total}</span>
    </h6>
    {pending !== undefined && (
      <h6 className="text-muted">
        Pending {title}: <span className={iconColor}>{pending}</span>
      </h6>
    )}
    {amount !== undefined && (
      <h6 className="text-muted">
        Total Amount: <span className={iconColor}>{amount} Tk</span>
      </h6>
    )}
  </div>
);

const Summary = () => {
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch All in One Go
        const [
          teachersRes,
          studentsRes,
          coursesRes,
          enrollsRes,
          paymentsRes,
          sadaqahRes,
          messagesRes,
        ] = await Promise.all([
          axiosInstance.get("/users/teachers/"),
          axiosInstance.get("/users/students/"),
          axiosInstance.get("/courses/courses/"),
          axiosInstance.get("/enrolls/enrolls/"),
          axiosInstance.get("/payment/payments/"),
          axiosInstance.get("/sadaqah/sadaqah/"),
          axiosInstance.get("/support/messages/"),
        ]);

        // Extract Data
        const teachers = teachersRes.data;
        const students = studentsRes.data;
        const courses = coursesRes.data;
        const enrolls = enrollsRes.data;
        const payments = paymentsRes.data;
        const sadaqah = sadaqahRes.data;
        const messages = messagesRes.data;

        // Group Enrollments by Course
        const courseCounts = {};
        enrolls.forEach(e => {
          const courseName = e.course?.title || "Unknown";
          if (!courseCounts[courseName]) courseCounts[courseName] = new Set();
          courseCounts[courseName].add(e.student);
        });

        const enrollmentsByCourse = Object.entries(courseCounts).map(([course, students]) => ({
          course,
          students: students.size
        }));

        // Calculate Totals
        setTotals({
          teachers: teachers.length,
          students: students.length,
          courses: courses.length,
          enrolls: enrolls.length,
          pendingEnrolls: enrolls.filter((e) => e.status === "Pending").length,

          payments: payments.length,
          pendingPayments: payments.filter((p) => p.status === "Pending").length,
          totalPayments: payments.reduce((sum, p) => sum + parseFloat(p.amount), 0),

          sadaqah: sadaqah.length,
          pendingSadaqah: sadaqah.filter((s) => !s.received).length,
          totalSadaqah: sadaqah.reduce((sum, s) => sum + parseFloat(s.amount), 0),

          messages: messages.length,
          pendingMessages: messages.filter((m) => !m.replied).length,

          enrollmentsByCourse,
        });
      } catch (err) {
        console.error("Failed to Fetch Dashboard Data:", err);
        toast.error("Failed to Load Dashboard Summary");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;
  if (!totals) return <p className="text-center text-danger">Failed to Load Data</p>;

  return (
    <section className="container-fluid p-3">
      <h3 className="text-center text-success text-uppercase mb-4">Dashboard Summary</h3>

      {/* Row 1 - Totals */}
      <div className="row mb-2">
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/teachers" icon={FaChalkboardTeacher} iconColor="text-success"
            title="Teachers" total={totals.teachers} />
        </div>
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/students" icon={FaUserGraduate} iconColor="text-success"
            title="Students" total={totals.students} />
        </div>
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/courses" icon={FaBook} iconColor="text-success"
            title="Courses" total={totals.courses} />
        </div>
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/blogs" icon={FaNewspaper} iconColor="text-success"
            title="Blogs" total={totals.blogs} pending={totals.pendingBlogs} />
        </div>
      </div>

      {/* Row 2 - Pending */}
      <div className="row text-center">
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/enrolls" icon={FaUserPlus} iconColor="text-warning"
            title="Enrolls" total={totals.enrolls} pending={totals.pendingEnrolls} />
        </div>
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/payments" icon={FaMoneyBillAlt} iconColor="text-primary" title="Payments"
            total={totals.payments} pending={totals.pendingPayments} amount={totals.totalPayments} />
        </div>
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/messages" icon={FaEnvelope} iconColor="text-danger"
            title="Messages" total={totals.messages} pending={totals.pendingMessages} />
        </div>
        <div className="col-md-3 mb-3">
          <SummaryCard to="/admin/sadaqah" icon={FaHandHoldingHeart} iconColor="text-info" title="Sadaqah"
            total={totals.sadaqah} pending={totals.pendingSadaqah} amount={totals.totalSadaqah} />
        </div>
      </div>

      {/* Accordion for Enrollments by Course */}
      <Accordion className="mt-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Enrollments by Course</Accordion.Header>
          <Accordion.Body className="row ms-1">
            <ul className="list-group mt-1 col-4">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Course Title</span><span className="me-2">Students</span>
              </li>
              {totals?.enrollmentsByCourse?.map((c, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center hsf">
                  {c.course}
                  <span className="badge w-20 bg-success"><b>{c.students}</b></span>
                </li>
              ))}
            </ul>

            <div className="col-8">
              <ResponsiveContainer width="100%" height={300} className={"hsf"}>
                <BarChart data={totals?.enrollmentsByCourse || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  {/* <YAxis allowDecimals={false} /> */}
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#198754" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </section>
  );
};

export default Summary;

// ***NEW*** \\




