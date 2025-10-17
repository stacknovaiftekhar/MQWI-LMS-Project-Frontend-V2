import axiosInstance from "../utilities/axiosInstance";

// Payment
const PaymentList = () => axiosInstance.get("/payment/payments/");
const PaymentInfo = (id) => axiosInstance.get(`/payment/payments/${id}`);
const PaymentRead = (qp) => axiosInstance.get(`/payment/payments/${qp}`);
const PaymentMake = (data) => axiosInstance.post("/payment/payments/", data);
const PaymentEdit = (id, data) => axiosInstance.patch(`/payment/payments/${id}/`, data);
const PaymentVoid = (id) => axiosInstance.delete(`/payment/payments/${id}/`);
const PaymentVerify = (id, data) => axiosInstance.post(`/payment/payments/${id}/verify/`, data);

// Invoice
const InvoiceVoid = (id) => axiosInstance.delete(`/payment/invoices/${id}/`);

export { PaymentList, PaymentInfo, PaymentRead };
export { PaymentMake, PaymentEdit, PaymentVoid, PaymentVerify };
export { InvoiceVoid };