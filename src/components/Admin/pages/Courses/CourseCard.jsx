import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router';
import { CourseInfo, FeatureInfo } from "../../../../api/course";
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import useDelete from '../../../../hooks/useDelete';

const CourseCard = () => {
  const [course, setCourse] = useState(null);
  const [features, setFeatures] = useState(null);
  const [featureID, setFeatureID] = useState(null);
  const { id } = useParams();
  const outletRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (featureID) fetchFeatures();
  }, [featureID]);

  useEffect(() => {
    if (location.state?.reload) {
      fetchCourse();
      fetchFeatures();
    }
  }, [location.state]);

  const fetchCourse = async () => {
    try {
      const response = await CourseInfo(id);
      setFeatureID(response.data.feature_id);
      setCourse(response.data);
    } catch (error) {
      console.error("Failed to Fetch Course Details:", error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await FeatureInfo(featureID);
      setFeatures(response.data);
    } catch (error) {
      console.error("Failed to Fetch Features:", error);
    }
  };

  const handleDelete = useDelete('courses/features', setCourse, {
    onSuccess: () => {
      setFeatures(null);
      navigate(`/admin/courses/detail/${id}`, { state: { reload: true } });
    }
  });

  const handleScroll = () => {
    outletRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!course) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  return (
    <section className="p-3">
      <div className="card shadow border position-relative p-4">
        <button type="button" className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close" onClick={() => navigate(`/admin/courses`)}></button>

        <div className="row mt-2">
          {/* Course Details */}
          <div className="col-md-6 pe-3">
            <h3 className="text-success fw-bold abf mb-3">{course.title}</h3>

            <div className="row mb-2">
              <div className="col-md-6">
                <p><span className="fw-bold">Instructor: </span><span className="abf">{course.teacher_name_bn}</span></p>
              </div>
              <div className="col-md-6">
                {/* <span className="abf">{course.category?.name}</span></p> */}
                <p><span className="fw-bold">Category: </span><span className="abf">{course.category_name}</span></p>
              </div>
            </div>

            <div className="mb-3">
              <p className="fw-bold">Short Description:</p>
              <p className="abf">{course.short_desc}</p>
            </div>

            <div className="mb-3">
              <p className="fw-bold">Detail Description:</p>
              <div dangerouslySetInnerHTML={{ __html: course.description }} className="abf" />
            </div>

            <div className="mb-3">
              <p className="fw-bold">Specialty:</p>
              <div dangerouslySetInnerHTML={{ __html: course.specialty }} className="abf" />
            </div>

            <p>
              <span className="fw-bold">Start Date: </span>
              <span>{formatDate(course.start_date)}</span>
            </p>
          </div>

          {/* Image and Features Section */}
          <div className="col-md-6">
            <h3 className="fw-bold text-success">{course.title_en}</h3>
            <div className="d-flex flex-column align-items-center mt-3">

              <div className="text-center mb-4">
                <img src={course.thumbnail} alt={course.title} className="img-fluid border rounded" />
              </div>

              {features ? (
                <div className="card w-100 p-3">
                  <h4 className="text-center text-success pb-2">Course Features</h4>
                  <ul className="list-group abf w-100 mb-3">
                    <ul className="d-flex">
                      <li className="list-group-item w-50 border-top-0">⏱ কোর্সের মেয়াদকাল: {features.duration} মাস।</li>
                      <li className="list-group-item w-50">📅 ক্লাস: সপ্তাহে {features.session} দিন।</li>
                    </ul>
                    <li className="list-group-item">🚻 আলাদা/উন্মুক্ত: {features.gender}</li>
                    <li className="list-group-item">🎯 ক্লাস মাধ্যম: {features.format}</li>
                    <li className="list-group-item">🌟 প্রশ্নোত্তর: {features.opportunity}</li>
                    <li className="list-group-item">🧠 পড়া ও মাশক: {features.guidance}</li>
                    <li className="list-group-item">🔁 পুনরাবৃত্তি: {features.revision}</li>
                    <li className="list-group-item">🤝 সাপোর্ট: {features.support}</li>
                    <li className="list-group-item">📚 উপকরণ: {features.resources}</li>
                    <li className="list-group-item">📜 সার্টিফিকেট: {features.certificate}</li>
                    <ul className="d-flex">
                      <li className="list-group-item w-50 border-top-0">💵 ভর্তি-ফি: {features.enrollment} টাকা।</li>
                      <li className="list-group-item w-50">💸 মাসিক-ফি: {features.tuition} টাকা।</li>
                    </ul>
                  </ul>
                  <div className="d-flex flex-inline text-center">
                    <Link to={`features/${features.id}`} className="btn btn-outline-warning btn-sm w-50 me-4" onClick={() => handleScroll()}>
                      <FaEdit className="me-1" /> EDIT FEATURES
                    </Link>
                    <button className="btn btn-sm btn-outline-danger w-50" onClick={() => handleDelete(featureID)}>
                      <FaTrash className="me-1" /> DELETE FEATURES
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                  <Link to="features" className="btn btn-outline-success fw-bold" onClick={() => handleScroll()}>
                    <FaPlusCircle className="me-1 mb-1" /> ADD FEATURES
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr />

        <div className="text-center mt-2 mb-2">
          <div className="row">
            <div className="col-md-6">
              <Link to={`/admin/courses/update/${course.id}`} className="btn btn-orange btn-sm w-50 fw-bold">EDIT COURSE</Link>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <Link to={`/admin/courses/${course.id}/modules`} className="btn btn-info btn-sm w-50 fw-bold">VIEW MODULES</Link>
            </div>
          </div>
        </div>
      </div>

      <div ref={outletRef} id="outlet-scroll-target" className="mt-3">
        <Outlet />
      </div>
    </section>
  );
};

export default CourseCard;