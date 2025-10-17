import { Link, Outlet, useLocation } from "react-router";
import { TeacherInfo } from "../../../api/admin";
import Loading from "../../../utilities/Loading";
import { FaLock, FaEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import PasswordModal from '../../Auth/PasswordModal';

const Profile = () => {
  const id = JSON.parse(localStorage.getItem("user"))?.id;
  const [teacher, setTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const fetchTeacher = async () => {
    try {
      const response = await TeacherInfo(id);
      setTeacher(response.data);
    } catch (error) {
      console.error("Failed to Fetch Teacher Details:", error);
    }
  };

  useEffect(() => {
    if (id) { fetchTeacher(); }
  }, [id]);

  useEffect(() => {
    if (location.state?.reload) {
      fetchTeacher();
    }
  }, [location.state]);

  if (!teacher) return <Loading />;

  return (
    <section>
      <div className="profile shadow border p-5 pb-4">
        <div className="row mb-md-4 mb-2 part-one">
          {/* Image Section */}
          <div className="col-md-4 d-flex mb-md-0 mb-3">
            <div className="card border justify-content-center align-items-center w-100">
              <img src={teacher.image} alt="Teacher Image" className="rounded" style={{ maxWidth: "240px", maxHeight: "240px" }} />
            </div>
          </div>

          {/* Basic Info */}
          <div className="col-md-8 d-flex">
            <ul className="list-group w-100 mb-md-0 mb-3">
              <div className="d-flex fw-bold">
                <li className="list-group-item w-33">🙍 Name</li>
                <li className="list-group-item w-67 border-start-0 border-1">{teacher.fullname}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-33 border-top-0"></li>
                <li className="list-group-item w-67 border-start-0 hsf">{teacher.name_bn}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-33 border-top-0">✉️ Email</li>
                <li className="list-group-item w-67 border-start-0">{teacher.email}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-33 border-top-0">📱 Mobile</li>
                <li className="list-group-item w-67 border-start-0">{teacher.username}</li>
              </div>
              <div className="d-flex">
                <li className="list-group-item w-33 border-top-0">🚻 Gender</li>
                <li className="list-group-item w-67 border-start-0">{teacher.gender}</li>
              </div>
            </ul>
          </div>
        </div>

        <ul className="list-group w-100 part-two">
          <div className="d-flex">
            <li className="list-group-item w-33">🎓 Qualification</li>
            <li className="list-group-item w-67 border-start-0 border-1 hsf">{teacher.bio}</li>
          </div>
          <div className="d-flex">
            <li className="list-group-item w-33 border-top-0">📜 Expertise</li>
            <li className="list-group-item w-67 border-start-0 hsf">{teacher.expertise}</li>
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