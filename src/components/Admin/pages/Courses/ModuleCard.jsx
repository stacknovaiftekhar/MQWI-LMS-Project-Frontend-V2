import { Link, Outlet, useParams, useLocation } from "react-router";
import { CourseInfo, ModuleList } from "../../../../api/course";
import { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import LessonCard from "./LessonCard";
import useDelete from '../../../../hooks/useDelete';

const ModuleCard = () => {
  const [course, setCourse] = useState({});
  const [modules, setModules] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const outletRef = useRef(null);

  useEffect(() => {
    fetchCourse();
    fetchModules();
  }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchCourse();
      fetchModules();
    }
  }, [location.state]);

  const fetchCourse = async () => {
    try {
      const response = await CourseInfo(id);
      setCourse(response.data);
    } catch (error) {
      console.error("Failed to Fetch Course Details:", error);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await ModuleList();
      const filtered = response.data.filter(module => module.course === parseInt(id));
      setModules(filtered);
    } catch (error) {
      console.error("Failed to Fetch Modules:", error);
    }
  };

  const handleDelete = useDelete('courses/modules', setModules, { onSuccess: fetchModules });

  const handleScroll = () => {
    outletRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!modules) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="p-3">
      <div className="card shadow border p-4">
        <h4 className="text-success text-center hsf mt-3 mb-0">{course.title}</h4>
        <div className="accordion mt-3" id="moduleAccordion">
          {modules.length > 0 ? (
            modules.map((module) => {
              const collapseId = `collapseModule${module.id}`;
              const headingId = `headingModule${module.id}`;
              return (
                <div className="card border-0 mt-3" key={module.id}>
                  <div className="accordion-item">
                    <h2 className="accordion-header hsf" id={headingId}>
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                        Module #{module.order}: {module.title}
                      </button>
                    </h2>
                    <div id={collapseId} className="accordion-collapse collapse"
                      aria-labelledby={headingId} data-bs-parent="#moduleAccordion">
                      <div className="accordion-body hsf">
                        <div className="row">
                          <div className="col-md-10">
                            <p>{module.description}</p>
                          </div>
                          <div className="col-md-2 btn-flex">
                            <Link to={`update/${module.id}`} className="btn btn-sm btn-warning btn-fixed-size"
                              onClick={() => handleScroll()}><FaEdit /></Link>
                            <button className="btn btn-sm btn-danger btn-fixed-size" onClick={() => handleDelete(module.id)}><FaTrash /></button>
                          </div>
                        </div>
                      </div>
                      <LessonCard moduleId={module.id} courseId={id} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-danger">No Modules Found</p>
          )}
        </div>
        <div className="text-center mt-4">
          <Link to="create" state={{ courseId: id }}
            className="btn btn-outline-primary btn-sm w-25" onClick={() => handleScroll()}>ADD NEW MODULE</Link>
        </div>
      </div>

      <div ref={outletRef} id="outlet-scroll-target" className="mt-5">
        <Outlet />
      </div>
    </section>
  );
};

export default ModuleCard;