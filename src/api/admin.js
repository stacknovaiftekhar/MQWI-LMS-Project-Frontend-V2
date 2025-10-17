import axiosInstance from "../utilities/axiosInstance";

// Teachers
// const TeacherList = () => axios.get(`${import.meta.env.VITE_API_URL}/users/teachers/`);
// const TeacherList = () => axios.get(`${API}/users/teachers/`);
// const TeacherEdit = (id, payload) => axios.patch(`${API}/users/teachers/${id}/`, payload, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//     });

// Teachers
const TeacherList = () => axiosInstance.get("/users/teachers");
const TeacherInfo = (id) => axiosInstance.get(`/users/teachers/${id}`);
const TeacherEdit = (id, data) => axiosInstance.patch(`/users/teachers/${id}/`, data);

// Students
const StudentList = () => axiosInstance.get(`/users/students/`);
const StudentInfo = (id) => axiosInstance.get(`/users/students/${id}`);
const StudentEdit = (id, data) => axiosInstance.patch(`/users/students/${id}/`, data);

// Contact Info
const ContactInfoDetail = () => axiosInstance.get(`/contact/contact-info`);
const ContactInfoCreate = (data) => axiosInstance.post("/contact/contact-info", data);
const ContactInfoUpdate = (data) => axiosInstance.patch(`/contact/contact-info`, data);

// Social Links
const SocialLinksDetail = () => axiosInstance.get(`/contact/social-links`);
const SocialLinksCreate = (data) => axiosInstance.post("/contact/social-links", data);
const SocialLinksUpdate = (data) => axiosInstance.patch(`/contact/social-links`, data);

// Wallet Info
const WalletInfoList = () => axiosInstance.get(`/contact/wallet-info`);
const WalletInfoData = (id) => axiosInstance.get(`/contact/wallet-info/${id}`);
const WalletInfoMake = (data) => axiosInstance.post("/contact/wallet-info/", data);
const WalletInfoEdit = (id, data) => axiosInstance.patch(`/contact/wallet-info/${id}/`, data);

// Bank Detail
const BankDetailList = () => axiosInstance.get(`/contact/bank-detail`);
const BankDetailData = (id) => axiosInstance.get(`/contact/bank-detail/${id}`);
const BankDetailMake = (data) => axiosInstance.post("/contact/bank-detail/", data);
const BankDetailEdit = (id, data) => axiosInstance.patch(`/contact/bank-detail/${id}/`, data);

// Exports
export { TeacherList, TeacherInfo, TeacherEdit };
export { StudentList, StudentInfo, StudentEdit };
export { ContactInfoDetail, ContactInfoCreate, ContactInfoUpdate };
export { SocialLinksDetail, SocialLinksCreate, SocialLinksUpdate };
export { WalletInfoList, WalletInfoData, WalletInfoMake, WalletInfoEdit };
export { BankDetailList, BankDetailData, BankDetailMake, BankDetailEdit };