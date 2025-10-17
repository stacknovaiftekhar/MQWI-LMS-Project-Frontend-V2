import { Link, Outlet, useLocation } from "react-router";
import Loading from "../../../utilities/Loading";
import { StudentInfo } from "../../../api/admin";
import { FaLock, FaEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import PasswordModal from '../../Auth/PasswordModal';

const Profile = () => {
  const id = JSON.parse(localStorage.getItem("user"))?.id;
  const [student, setStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const fetchStudent = async () => {
    try {
      const response = await StudentInfo(id);
      setStudent(response.data);
    } catch (error) {
      console.error("Failed to Fetch Student Details:", error);
    }
  };

  useEffect(() => {
    if (id) { fetchStudent(); }
  }, [id]);

  useEffect(() => {
    if (location.state?.reload) {
      fetchStudent();
    }
  }, [location.state]);

  if (!student) return <Loading />;

  return (
    <section className="container mt-5">
      <div className="profile shadow border p-5 pb-4">
        <div className="row mb-md-4 mb-2 part-one">
          {/* Image Section */}
          <div className="col-md-4 d-flex mb-md-0 mb-4">
            <div className="card border justify-content-center align-items-center w-100">
              <img src={student.image} alt="Student Image" className="rounded" style={{ maxWidth: "240px", maxHeight: "240px" }} />
            </div>
          </div>

          {/* Basic Info */}
          <div className="col-md-8 d-flex">
            <ul className="list-group w-100 mb-md-0 mb-3">
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
                <li className="list-group-item w-33 border-top-0">🚻 Gender</li>
                <li className="list-group-item w-67 border-start-0">{student.gender}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-33 border-top-0">🔐 Password</li>
                <li className="list-group-item w-67 border-start-0">
                  <button onClick={() => setShowModal(true)} className="btn btn-outline-success btn-sm px-4">
                    <FaLock className="me-1" /> CHANGE PASSWORD
                  </button>
                </li>
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
            <li className="list-group-item w-33 border-top-0">💬 Whatsapp</li>
            <li className="list-group-item w-67 border-start-0">{student.whatsapp}</li>
          </div>
          <div className="d-flex">
            <li className="list-group-item w-33 border-top-0">🏠 Address</li>
            <li className="list-group-item w-67 border-start-0">{student.address}</li>
          </div>
        </ul>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Link to="edit" className="btn btn-outline-warning btn-sm w-50">
            <FaEdit className="me-1" /> EDIT PROFILE
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PasswordModal onClose={() => setShowModal(false)} />
      )}

      <div id="outlet-scroll-target" className="mt-5">
        <Outlet />
      </div>
    </section>
  )
}

export default Profile;








