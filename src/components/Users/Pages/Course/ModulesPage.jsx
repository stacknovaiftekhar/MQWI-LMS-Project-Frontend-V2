import { FaAngleDoubleLeft, FaAngleDoubleRight, FaDownload } from 'react-icons/fa';
import axiosInstance from "../../../../utilities/axiosInstance";
import Loading from "../../../../utilities/Loading";
import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ModulesSide from "./ModulesSide";
import VideoPlayer from "./VideoPlayer";

const ModulesPage = () => {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Fetch Course + Modules (Modules include Lessons & completed flags from Backend)
  const fetchCourseAndModules = async () => {
    try {
      const [courseRes, modulesRes] = await Promise.all([
        axiosInstance.get(`/courses/courses/${id}/`),
        axiosInstance.get(`/courses/modules/?course=${id}`),
      ]);

      setCourse(courseRes.data);

      // Ensure Modules are Sorted by Order
      const mods = Array.isArray(modulesRes.data) ? modulesRes.data : modulesRes.data.results || [];

      setModules(mods);

      // Pick First Incomplete Lesson as Current
      if (!currentLesson) {
        let selectedLesson = null;

        for (const m of mods) {
          if (Array.isArray(m.lessons)) {
            selectedLesson = m.lessons.find(l => !l.completed);
            if (selectedLesson) break;
          }
        }

        // Fallback: if all are completed, use the very first available lesson
        if (!selectedLesson) {
          selectedLesson = mods.find(m => Array.isArray(m.lessons) && m.lessons.length > 0)?.lessons?.[0];
          // OR, If all lessons completed, fallback to last lesson
          // const lastModule = mods[mods.length - 1];
          // selectedLesson = lastModule?.lessons?.[lastModule.lessons.length - 1];
        }

        if (selectedLesson) setCurrentLesson(selectedLesson);
      }
    } catch (err) {
      console.error("Failed to Load Course or Modules", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourseAndModules(); }, [id]);

  // Update when a Lesson is Selected from Sidebar
  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mark Current Lesson Complete and Move to Next Lesson
  const markCompleteAndNext = async () => {
    if (!currentLesson) return;
    try {
      await axiosInstance.post("/enrolls/enrolls/user-lesson-progress/", { lesson_id: currentLesson.id, completed: true });
      // Optimistic UI Update: Mark Completed Locally
      setModules(prev => prev.map(m => ({
        ...m,
        lessons: m.lessons.map(l => l.id === currentLesson.id ? { ...l, completed: true } : l)
      })));

      // Find Next Lesson
      let found = false;
      for (let mi = 0; mi < modules.length; mi++) {
        const m = modules[mi];
        for (let li = 0; li < m.lessons.length; li++) {
          const l = m.lessons[li];
          if (found) { handleSelectLesson(l); return; } // First Lesson after Current
          if (l.id === currentLesson.id) found = true;
        }
      }
      // If not Found Next Lesson (End of Course) do nothing or Show Message
      alert("You have reached the End of the Course.");
    } catch (err) {
      console.error("Failed to Mark Complete", err);
    }
  };

  // Calculate Overall Course Progress (Percentage)
  const overallProgress = () => {
    const allLessons = modules.flatMap(m => Array.isArray(m.lessons) ? m.lessons : []);
    const total = allLessons.length;
    if (total === 0) return 0;
    const done = allLessons.filter(l => l.completed).length;
    return Math.round((done / total) * 100);
  };

  if (loading) return <Loading />;
  if (!course) return <div className="p-4 text-danger text-center">Course Not Found.</div>;

  return (
    <section className="modules-page">
      <div className="d-flex" style={{ minHeight: "80vh" }}>
        {/* Sidebar */}
        <aside className="modules-aside" style={{ width: sidebarOpen ? 360 : 0 }}>
          {modules.length === 0 ? (
            <div className="alert alert-danger text-center text-danger m-3">
              <p>No Modules Available for This Course.</p>
            </div>
          ) : (
            <ModulesSide modules={modules} onSelectLesson={handleSelectLesson} currentLesson={currentLesson} />
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 d-flex flex-column">
          {/* Topbar */}
          <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-orange text-white">
            <div className="d-flex align-items-center">
              <button className="btn btn-sm btn-warning me-3" onClick={() => setSidebarOpen(open => !open)}>
                {sidebarOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
              </button>
              <h5 className="mb-0 abf">{course.title}</h5>
            </div>
            <div className="d-flex align-items-center">
              <div className="me-3">Your Progress: {overallProgress()}%</div>
              <button className={`btn btn-sm ${currentLesson?.completed ? "btn-warning disabled" : "btn-outline-light"}`}
                onClick={!currentLesson?.completed ? markCompleteAndNext : undefined}>
                {currentLesson?.completed ? "Lesson Completed" : "Mark as Complete"}
              </button>
            </div>
          </div>

          {/* Progress Bar below Topbar */}
          <ProgressBar now={overallProgress()} label={`${overallProgress()}%`} variant="success" animated className="m-3 mb-1" />

          {/* Content Area - Video on Top + Lesson Info Below */}
          <div className="p-3" style={{ overflow: "auto" }}>
            <div className="row gx-3">
              <div className="col-lg-11">

                <VideoPlayer lesson={currentLesson} logoUrl="/images/logo/main-logo.png" />
                {/* Lesson Meta: PDF + Download and Content */}
                {currentLesson?.video && (
                  <div className="card my-4">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img src="/images/icon/pdf-icon.png" alt="PDF Sheet" style={{ width: 24, marginRight: 10 }} />
                        <div className="hsf me-5">{currentLesson?.title || "No Lesson Selected"}</div>
                        <div>{currentLesson?.sheet && (<small className="text-muted">Sheet Available</small>)}</div>
                      </div>
                      {currentLesson?.sheet ? (
                        <a className="btn btn-outline-success btn-sm px-3" href={currentLesson.sheet} download>
                          <FaDownload className="me-1" />Download PDF
                        </a>
                      ) : null}
                    </div>

                    {currentLesson?.content ? (
                      <div className="card-body border-top hsf">
                        <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ModulesPage;