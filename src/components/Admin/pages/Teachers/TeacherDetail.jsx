import { FaUser, FaMobileAlt, FaEnvelope, FaTransgender, FaGraduationCap, FaStar } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router';
import { TeacherInfo } from "../../../../api/admin";
import { useEffect, useState } from 'react';

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await TeacherInfo(id);
        setTeacher(response.data);
      } catch (error) {
        console.error("Failed to Fetch Teacher Details:", error);
      }
    };

    fetchTeacher();
  }, [id]);

  if (!teacher) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="card shadow border position-relative p-3">
      <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close" onClick={() => navigate(`/admin/teachers`)}></button>

      <div className="row mb-3 mb-md-0">
        {/* Image Section */}
        <div className="col-md-4 text-center">
          <img src={teacher.image || "/default-teacher.png"} className="img-fluid border rounded"
            alt="Teacher Image" style={{ maxHeight: "220px", objectFit: "cover" }}
          />
        </div>

        {/* Basic Info */}
        <div className="col-md-8">
          <h5 className="text-success"><FaUser className="me-2" />{teacher.fullname}</h5>
          <p><FaEnvelope className="me-2 text-primary" />{teacher.email}</p>
          <p><FaMobileAlt className="me-2 text-danger" />{teacher.username}</p>
          <p><FaTransgender className="me-2 text-info" />{teacher.gender}</p>
        </div>
      </div>

      <hr />

      <div className="my-2">
        {/* <h6 className="text-success"><FaUser className="me-2" /><strong>Bangla Name:</strong> {teacher.name_bn}</h6> */}
        <h6 className="text-success hsf"><FaUser className="me-2" /><strong>নাম:</strong> {teacher.name_bn}</h6>
      </div>

      {/* Qualification */}
      <div className="mb-2">
        <h6><FaGraduationCap className="me-2 text-warning" />Qualification</h6>
        <p className="hsf">{teacher.bio}</p>
      </div>

      {/* Expertise */}
      <div>
        <h6><FaStar className="me-2 text-warning" />Expertise</h6>
        <p className="hsf">{teacher.expertise}</p>
      </div>

      <div className="text-center my-2">
        <Link to={`/admin/teachers/update/${teacher.id}`} className="btn btn-orange btn-sm w-50 fw-bold">EDIT PROFILE</Link>
      </div>
    </section>
  );
};

export default TeacherDetail;