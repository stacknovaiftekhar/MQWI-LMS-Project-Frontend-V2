import { FaYoutube } from 'react-icons/fa';

const ModuleProgressBadge = ({ module }) => {
  const lessons = Array.isArray(module.lessons) ? module.lessons : [];
  const total = lessons.length;
  const done = lessons.filter(l => l.completed).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return <span className="badge bg-success">{percent}%</span>;
};

const ModulesSide = ({ modules = [], onSelectLesson, currentLesson }) => {
  return (
    <div className="p-3">
      <div className="d-flex align-items-center mb-3">
        <h6 className="flex-grow-1 text-orange ms-3 mb-0">Modules & Lessons</h6>
      </div>

      <div className="accordion" id="moduleAccordion">
        {modules.length === 0 ? (
          <div className="alert alert-warning">No Modules Found!</div>
        ) : modules.map(mod => {
          const headingId = `heading${mod.id}`;
          const collapseId = `collapse${mod.id}`;
          return (
            <div className="accordion-item" key={mod.id}>
              <h2 className="accordion-header hsf" id={headingId}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>{mod.title}
                  <span className="ms-auto"><ModuleProgressBadge module={mod} /></span>
                </button>
              </h2>
              <div id={collapseId} className="accordion-collapse collapse" aria-labelledby={headingId} data-bs-parent="#moduleAccordion">
                <div className="accordion-body p-2">
                  {Array.isArray(mod.lessons) && mod.lessons.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {mod.lessons.map(lesson => (
                        <li key={lesson.id} className="d-flex justify-content-between align-items-center py-1">
                          <button className={`btn btn-link hsf ${currentLesson?.id === lesson.id ? "active" : ""}`}
                            onClick={() => onSelectLesson(lesson)}>
                            <FaYoutube className={`${lesson.completed ? "text-success" : ""} mx-2 fs-5`} /> {lesson.title}
                          </button>
                          <small className="text-muted">{lesson.duration || ""}</small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="alert alert-warning mb-0">No Lessons in this Module!</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModulesSide;