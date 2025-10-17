import { FaEdit, FaTrash, FaVideo, FaFilePdf } from 'react-icons/fa';
import { LessonList } from "../../../../api/course";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import useDelete from '../../../../hooks/useDelete';

// eslint-disable-next-line react/prop-types
const LessonCard = ({ moduleId, courseId }) => {
  const [lessons, setLessons] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchLessons();
    }
  }, [location.state]);

  const fetchLessons = async () => {
    try {
      const response = await LessonList();
      const filtered = response.data.filter(lesson => lesson.module === parseInt(moduleId));
      setLessons(filtered);
    } catch (error) {
      console.error("Failed to Fetch Lessons:", error);
    }
  };

  const handleDelete = useDelete('courses/lessons', setLessons, { onSuccess: fetchLessons });

  if (!lessons) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="p-3 pt-0">
      <div className="accordion" id={`lessonAccordion-${moduleId}`}>
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => {
            const collapseId = `collapseLesson${lesson.id}`;
            const headingId = `headingLesson${lesson.id}`;
            return (
              <div className="card border-0 mb-2" key={lesson.id}>
                <div className="accordion-item">
                  <h2 className="accordion-header hsf" id={headingId}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                      <span className="text-success">Lesson #{index + 1}</span>: {lesson.title}
                    </button>
                  </h2>
                  <div id={collapseId} className="accordion-collapse collapse" aria-labelledby={headingId} data-bs-parent={`#lessonAccordion-${moduleId}`}>
                    <div className="accordion-body hsf">
                      <div className="row">
                        <div className="col-md-10">
                          <div className="row">
                            <div className="col-md-6">
                              <p><strong>Video Preview:</strong>
                                {lesson.video &&
                                  <a href={lesson.video} target="_blank" rel="noopener noreferrer"
                                    className="btn btn-sm btn-primary ms-2"><FaVideo /></a>
                                }
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p><strong>PDF Preview:</strong>
                                {lesson.sheet &&
                                  <a href={lesson.sheet} target="_blank" rel="noopener noreferrer"
                                    className="btn btn-sm btn-success ms-2"><FaFilePdf /></a>
                                }
                              </p>
                            </div>
                          </div>
                          {lesson.content && <p><strong>Content:</strong> {lesson.content}</p>}
                        </div>
                        <div className="col-md-2 btn-flex">
                          <Link to={`${moduleId}/lessons/update/${lesson.id}`} state={{ courseId, moduleId }}
                            className="btn btn-sm btn-warning btn-fixed-size"><FaEdit /></Link>
                          <button className="btn btn-sm btn-danger btn-fixed-size"
                            onClick={() => handleDelete(lesson.id)}><FaTrash /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-danger">No Lessons Found</p>
        )}
      </div>

      <div className="text-center mt-3">
        <Link to={`${moduleId}/lessons/create`} state={{ courseId, moduleId }} className="btn btn-outline-info btn-sm w-25">
          ADD NEW LESSON</Link>
      </div>
    </section>
  );
};

export default LessonCard;