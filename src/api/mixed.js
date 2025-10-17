import axiosInstance from "../utilities/axiosInstance";

// Purpose
const PurposeList = () => axiosInstance.get(`/sadaqah/purpose`);
const PurposeInfo = (id) => axiosInstance.get(`/sadaqah/purpose/${id}`);
const PurposeMake = (data) => axiosInstance.post("/sadaqah/purpose/", data);
const PurposeEdit = (id, data) => axiosInstance.patch(`/sadaqah/purpose/${id}/`, data);

// Sadaqah
const SadaqahList = () => axiosInstance.get(`/sadaqah/sadaqah`);
const SadaqahInfo = (id) => axiosInstance.get(`/sadaqah/sadaqah/${id}`);
const SadaqahMake = (data) => axiosInstance.post("/sadaqah/sadaqah/", data);
const SadaqahEdit = (id, data) => axiosInstance.patch(`/sadaqah/sadaqah/${id}/`, data);

// Sadaqah
const MessageList = () => axiosInstance.get(`/support/messages`);
const MessageInfo = (id) => axiosInstance.get(`/support/messages/${id}`);
const MessageMake = (data) => axiosInstance.post("/support/messages/", data);
const MessageEdit = (id, data) => axiosInstance.patch(`/support/messages/${id}/`, data);


export { PurposeList, PurposeInfo, PurposeMake, PurposeEdit };
export { SadaqahList, SadaqahInfo, SadaqahMake, SadaqahEdit };
export { MessageList, MessageInfo, MessageMake, MessageEdit };
