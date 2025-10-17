import { useLocation, Link, Outlet } from 'react-router';
import { PaymentList } from "../../../api/payment";
import { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { toast } from "react-toastify";
import $ from "jquery";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState("Registration");
  // Filters
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [dataTable, setDataTable] = useState(null);
  const location = useLocation();
  
  const fetchPayments = async () => {
    try {
      const response = await PaymentList();
      setPayments(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to Fetch Payments:", error);
      toast.error("Failed to Fetch Payments!");
      return [];
    }
  };

  const initDataTable = () => {
    const tableId = "#paymentsTable";
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }
    const dt = $(tableId).DataTable({ paging: true, info: true, searching: true, ordering: true,
      responsive: true, language: { emptyTable: "No Payment Entry Found!" } });
    setDataTable(dt);
    return dt;
  };

  const destroyDataTable = () => {
    if (dataTable) {
      dataTable.destroy();
      setDataTable(null);
    }
  };

  useEffect(() => {
    fetchPayments();
    return () => destroyDataTable();
  }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchPayments().then(() => {
        destroyDataTable();
        setTimeout(initDataTable, 100);
      });
    }
  }, [location.state?.reload]);

  // Filters
  useEffect(() => {
    const result = payments.filter((p) => {
      const matchesTab = p.type === activeTab;
      const matchesCourse = selectedCourse ? p.enrollment_info?.course === selectedCourse : true;
      const matchesStudent = selectedStudent ? p.enrollment_info?.student === selectedStudent : true;
      return matchesTab && matchesCourse && matchesStudent;
    });
    setFilteredPayments(result);
    
    destroyDataTable();
    setTimeout(initDataTable, 100);
  }, [payments, activeTab, selectedCourse, selectedStudent]);
  
  const getStatusBadge = (status) => {
    let color = "secondary";
    if (status === "Verified") color = "success";
    else if (status === "Pending") color = "warning";
    return <span className={`badge bg-${color}`}>{status}</span>;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  // Filters: Extract Courses & Students from Payments
  const courses = [...new Set(payments.map((p) => p.enrollment_info?.course).filter(Boolean))];
  const students = [...new Set(payments.map((p) => p.enrollment_info?.student).filter(Boolean))];

  const formatMonth = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (!payments) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <section className="container-fluid p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h4 className="mb-0 text-success">Payment List</h4>
        <div className="d-flex flex-wrap align-items-center">
          <button className={`btn btn-sm me-2 ${activeTab === "Registration" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setActiveTab("Registration")}>Registration Fee</button>
          <button className={`btn btn-sm me-2 ${activeTab === "Monthly" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setActiveTab("Monthly")}>Monthly Fee</button>
          <select className="form-select form-select-sm me-2 hsf" style={{ width: "auto" }}
            value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map((course, idx) => <option key={idx} value={course}>{course}</option>)}
          </select>
          <select className="form-select form-select-sm me-2 hsf" style={{ width: "auto" }}
            value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">All Students</option>
            {students.map((student, idx) => <option key={idx} value={student}>{student}</option>)}
          </select>
          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => { setSelectedCourse(""); setSelectedStudent(""); }}>Reset</button>
          <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>🔄 Refresh</button>
          <Link to="/admin/accounts" className="btn btn-sm btn-info ms-2">Accounts</Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive card p-2">
        <table id="paymentsTable" className="table table-bordered table-striped table-success table-hover align-middle">
          <thead>
            <tr>
              <th width="3%">#</th>
              <th>Course Title</th>
              <th>Student Name</th>
              <th>Month</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Date</th>
              <th width="8%">Status</th>
              <th className="text-center" width="7%">View</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
                <tr key={payment.id} className="align-middle">
                  <td className="text-center">{index + 1}</td>
                  <td className="hsf">{payment.enrollment_info?.course}</td>
                  <td>{payment.enrollment_info?.student}</td>
                  <td>{formatMonth(payment.month) || "-"}</td>
                  <td>{payment.payment_method}</td>
                  <td>{payment.amount}</td>
                  <td>{formatDate(payment.date)}</td>
                  <td className="text-center">{getStatusBadge(payment.status)}</td>
                  <td className="text-center">
                    <Link to={`${payment.id}/detail`} className="btn btn-sm btn-info me-2"><FaEye /></Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div id="outlet-scroll-target">
        <Outlet />
      </div>
    </section>
  );
};

export default Payments;