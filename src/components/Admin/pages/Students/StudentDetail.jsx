import { useParams, useNavigate } from 'react-router';
import { StudentInfo } from "../../../../api/admin";
import { useState, useEffect } from 'react';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.getElementById('outlet-scroll-target');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await StudentInfo(id);
        setStudent(response.data);
      } catch (error) {
        console.error("Failed to Fetch Student Details:", error);
      }
    };

    if (id) { fetchStudent(); }
  }, [id]);

  if (!student) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  console.log(student?.enrollments.filter((en) => en.status === "Enrolled").map((en) => en.course.title));
  // {student?.enrollments?.filter((en) => en.status === "Enrolled")
  //             .map((en) => en.course_title).join(", ") || "No Enrolled Courses"}

  return (
    <section className="profile card shadow border position-relative p-5 pt-4">
      <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close" onClick={() => navigate(`/admin/students`)}></button>
      <h4 className="text-success text-center mb-4">Student Details</h4>

      <div className="row mb-md-4 mb-2 part-one">
        {/* Image Section */}
        <div className="col-md-4 d-flex mb-md-0 mb-4">
          <div className="card border justify-content-center align-items-center w-100">
            <img src={student.image} alt="Student Image" style={{ maxWidth: "240px", maxHeight: "240px" }} />
          </div>
        </div>

        {/* Basic Info */}
        <div className="col-md-8 d-flex">
          <ul className="list-group w-100 mb-3">
            <div className="d-flex fw-bold">
              <li className="list-group-item w-33">🙍 Name</li>
              <li className="list-group-item w-67 border-start-0 border-1">{student.fullname}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-33 border-top-0">✉️ Email</li>
              <li className="list-group-item w-67 border-start-0">{student.email}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-33 border-top-0">📱 Mobile</li>
              <li className="list-group-item w-67 border-start-0">{student.username}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-33 border-top-0">💬 Whatsapp</li>
              <li className="list-group-item w-67 border-start-0">{student.whatsapp}</li>
            </div>
            <div className="d-flex">
              <li className="list-group-item w-33 border-top-0">🚻 Gender</li>
              <li className="list-group-item w-67 border-start-0">{student.gender}</li>
            </div>
          </ul>
        </div>
      </div>

      <ul className="list-group w-100 part-two">
        <div className="d-flex">
          <li className="list-group-item w-33">👨‍💻 Occupation</li>
          <li className="list-group-item w-67 border-start-0 border-1">{student.occupation}</li>
        </div>
        <div className="d-flex">
          <li className="list-group-item w-33 border-top-0">📛 Designation</li>
          <li className="list-group-item w-67 border-start-0">{student.designation}</li>
        </div>
        <div className="d-flex">
          <li className="list-group-item w-33 border-top-0">🏛️ Organization</li>
          <li className="list-group-item w-67 border-start-0">{student.organization}</li>
        </div>
        <div className="d-flex">
          <li className="list-group-item w-33 border-top-0">📘 Facebook</li>
          <li className="list-group-item w-67 border-start-0">{student.facebook}</li>
        </div>
        <div className="d-flex">
          <li className="list-group-item w-33 border-top-0">🔗 Linkedin</li>
          <li className="list-group-item w-67 border-start-0">{student.linkedin}</li>
        </div>
        <div className="d-flex">
          <li className="list-group-item w-33 border-top-0">🏠 Address</li>
          <li className="list-group-item w-67 border-start-0">{student.address}</li>
        </div>
        <div className="d-flex">
          <li className="list-group-item w-33 border-top-0">📚 Enrolled Courses</li>
          <li className="list-group-item w-67 border-start-0">
            {student?.enrollments?.filter((en) => en.status === "Enrolled").map((en, idx) => (
              <span key={en.id} className='me-3 hsf'>{idx+1}. {en.course.title}</span>
            ))}
          </li>
        </div>
      </ul>
    </section>
  )
}

export default StudentDetail;