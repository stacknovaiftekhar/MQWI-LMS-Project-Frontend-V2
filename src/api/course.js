import axiosInstance from "../utilities/axiosInstance";

// Categories
const CategoryList = () => axiosInstance.get("/courses/categories");
const CategoryInfo = (id) => axiosInstance.get(`/courses/categories/${id}/`);
const CategoryMake = (data) => axiosInstance.post("/courses/categories/", data);
const CategoryEdit = (id, data) => axiosInstance.patch(`/courses/categories/${id}/`, data);

// Courses
const CourseList = () => axiosInstance.get("/courses/courses");
const CourseInfo = (id) => axiosInstance.get(`/courses/courses/${id}/`);
// const CourseMake = (data) => axiosInstance.post("/courses/courses/", data);
// const CourseEdit = (id, data) => axiosInstance.patch(`/courses/${id}/`, data);
const CourseMake = (data) => axiosInstance.post(`/courses/courses/`, data, {
    headers: { "Content-Type": "multipart/form-data" }, });
const CourseEdit = (id, data) => axiosInstance.patch(`/courses/courses/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" }, });

// Features
// const FeatureList = () => axiosInstance.get("/courses/features");
const FeatureInfo = (id) => axiosInstance.get(`/courses/features/${id}`);
const FeatureMake = (data) => axiosInstance.post("/courses/features/", data);
const FeatureEdit = (id, data) => axiosInstance.patch(`/courses/features/${id}/`, data);

// Modules
const ModuleList = () => axiosInstance.get("/courses/modules/");
const ModuleInfo = (id) => axiosInstance.get(`/courses/modules/${id}`);
const ModuleMake = (data) => axiosInstance.post("/courses/modules/", data);
const ModuleEdit = (id, data) => axiosInstance.patch(`/courses/modules/${id}/`, data);

// Lessons
const LessonList = () => axiosInstance.get("/courses/lessons/");
const LessonInfo = (id) => axiosInstance.get(`/courses/lessons/${id}`);
const LessonMake = (data) => axiosInstance.post("/courses/lessons/", data);
const LessonEdit = (id, data) => axiosInstance.patch(`/courses/lessons/${id}/`, data);

// Exports
export { CategoryList, CategoryInfo, CategoryMake, CategoryEdit };
export { CourseList, CourseInfo, CourseMake, CourseEdit };
export { FeatureInfo, FeatureMake, FeatureEdit };
export { ModuleList, ModuleInfo, ModuleMake, ModuleEdit };
export { LessonList, LessonInfo, LessonMake, LessonEdit };