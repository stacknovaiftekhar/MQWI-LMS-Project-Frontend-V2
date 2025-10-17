import axiosInstance from "../utilities/axiosInstance";

// Enrollment
const EnrollList = () => axiosInstance.get("/enrolls/enrolls/");
const EnrollInfo = (id) => axiosInstance.get(`/enrolls/enrolls/${id}`);
const EnrollEdit = (id, data) => axiosInstance.put(`/enrolls/enrolls/${id}/`, data);
const EnrollVoid = (id) => axiosInstance.delete(`/enrolls/enrolls/${id}/`);

// const IsEnrolled = (cid) => axiosInstance.get(`/enrolls/enrolls/is_enrolled/?course=${cid}`);
const IsEnrolled = (cid) => axiosInstance.get(`/enrolls/enrolls/is_enrolled/`, { params: { course: cid }, });

export { EnrollList, EnrollInfo, EnrollEdit, EnrollVoid, IsEnrolled };
