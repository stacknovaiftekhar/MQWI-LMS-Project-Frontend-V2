import { PaymentList } from "../../../api/payment";
import Loading from "../../../utilities/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import $ from "jquery";

const Accounts = () => {
  // States
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState(null);

  // Filters
  const [filterType, setFilterType] = useState("all");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterStudent, setFilterStudent] = useState("");
  const [filterMethod, setFilterMethod] = useState("all");
  const [filterMonth, setFilterMonth] = useState("");   // yyyy-mm
  const [filterDay, setFilterDay] = useState("");    // yyyy-mm-dd
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch Payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await PaymentList();
      setPayments(response.data || []);
      return response.data || [];
    } catch (error) {
      console.error("Failed to Fetch Payments:", error);
      toast.error("Failed to Fetch Payments!");
      setPayments([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const initDataTable = () => {
    const tableId = "#accountsTable";
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }
    const dt = $(tableId).DataTable({
      paging: true,
      info: true,
      searching: true,
      ordering: true,
      responsive: true,
      language: { emptyTable: "No Payment Entry Found!" },
    });
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

  // Filters: Extract Courses & Students from Payments
  const courses = [...new Set(payments.map((p) => p.enrollment_info?.course).filter(Boolean))];
  const students = [...new Set(payments.map((p) => p.enrollment_info?.student).filter(Boolean))];
  const methods = [...new Set(payments.map((p) => p.payment_method).filter(Boolean))];

  // Filtering
  useEffect(() => {
    const q = (search || "").trim().toLowerCase();

    const result = payments.filter((p) => {
      if (filterType !== "all" && p.type !== filterType) return false;
      if (filterCourse && (p.enrollment_info?.course ?? "") !== filterCourse) return false;
      if (filterStudent && (p.enrollment_info?.student ?? "") !== filterStudent) return false;
      if (filterMethod !== "all" && (p.payment_method ?? "").toLowerCase() !== filterMethod.toLowerCase()) return false;
      if (filterStatus !== "all" && (p.status ?? "").toLowerCase() !== filterStatus.toLowerCase()) return false;

      if (filterMonth) {
        const mm = p.month ? p.month.slice(0, 7) : (p.date ? p.date.slice(0, 7) : "");
        if (mm !== filterMonth) return false;
      }
      if (filterDay) {
        const dd = (p.date || p.month || "").slice(0, 10);
        if (dd !== filterDay) return false;
      }

      if (q) {
        const hay = `${p.enrollment_info?.student || ""} ${p.enrollment_info?.course || ""} ${p.txn_id || ""} ${p.payment_method || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    setFilteredPayments(result);

    // Update totalAmount
    const sum = result.reduce((acc, item) => {
      const n = parseFloat(item.amount);
      return acc + (isNaN(n) ? 0 : n);
    }, 0);
    setTotalAmount(sum);

    // Re-Init DataTable after DOM Update
    destroyDataTable();
    setTimeout(initDataTable, 100);
  }, [payments, filterType, filterCourse, filterStudent, filterMonth, filterDay, filterMethod, filterStatus, search]);

// *****COMPLETED***** \\
  // Reset Filters
  const resetFilters = () => {
    setFilterType("all");
    setFilterCourse("");
    setFilterStudent("");
    setFilterMonth("");
    setFilterDay("");
    setFilterMethod("all");
    setFilterStatus("all");
    setSearch("");
  };

  const getStatusBadge = (status) => {
    let color = "secondary";
    if (status === "Verified") color = "success";
    else if (status === "Pending") color = "warning";
    return <span className={`badge bg-${color}`}>{status}</span>;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const formatMonth = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (loading) return <Loading />;
  if (!payments.length) return <div className="p-4 text-danger text-center">No Payment Entry Found</div>;

  return (
    <section className="container-fluid p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h4 className="mb-0 text-success">Accounts</h4>
        <div className="d-flex flex-wrap align-items-center">
          <span className="me-3 text-primary">🔹Filters ➽</span>
          {/* Type */}
          <select className="form-select form-select-sm me-3" style={{ width: "auto" }}
            value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Type</option>
            <option value="Registration">Registration</option>
            <option value="Monthly">Monthly</option>
          </select>

          {/* Course */}
          <select className="form-select form-select-sm me-3 hsf" style={{ width: "auto" }}
            value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map((course, idx) => (
              <option key={idx} value={course}>{course}</option>
            ))}
          </select>

          {/* Student */}
          <select className="form-select form-select-sm me-3 hsf" style={{ width: "auto" }}
            value={filterStudent} onChange={(e) => setFilterStudent(e.target.value)}>
            <option value="">All Students</option>
            {students.map((student, idx) => (
              <option key={idx} value={student}>{student}</option>
            ))}
          </select>

          {/* Method */}
          <select className="form-select form-select-sm" style={{ width: "204px" }}
            value={filterMethod} onChange={(e) => setFilterMethod(e.target.value)}>
            <option value="all">Select Method</option>
            {methods.map((method, idx) => (
              <option key={idx} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>🔄 Refresh</button>
        <div className="d-flex flex-wrap align-items-center">
          {/* Month */}
          <div className="d-flex align-items-center me-3">
            <label className="me-2">Month:</label>
            <input type="month" className="form-control form-control-sm" value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)} />
          </div>

          {/* Day */}
          <div className="d-flex align-items-center me-3">
            <label className="me-2">Date:</label>
            <input type="date" className="form-control form-control-sm" value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}/>
          </div>

          {/* Status */}
          <select className="form-select form-select-sm me-3" style={{ width: "auto" }}
            value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Search */}
          <div className="d-flex align-items-center me-3">
            <input type="text" className="form-control form-control-sm" placeholder="Search: Course / Student / TXN ID"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <button className="btn btn-sm btn-outline-info" onClick={resetFilters}>Reset</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-responsive card p-2" style={{ fontSize: "0.95rem" }}>
        <table id="accountsTable" className="table table-bordered table-striped table-primary table-hover align-middle">
          <thead>
            <tr>
              <th width="3%">#</th>
              <th>Course Title</th>
              <th>Student Name</th>
              <th>Type</th>
              <th>Month</th>
              <th>Date</th>
              <th>Method</th>
              <th>Amount</th>
              <th className="text-center" width="7%">TXN</th>
              <th width="7%">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={payment.id} className="align-middle">
                <td className="text-center">{index + 1}</td>
                <td className="hsf">{payment.enrollment_info?.course}</td>
                <td>{payment.enrollment_info?.student}</td>
                <td>{payment.type}</td>
                <td>{formatMonth(payment.month) || "-"}</td>
                <td>{formatDate(payment.date)}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.amount}</td>
                <td>{payment.txn_id}</td>
                <td className="text-center">{getStatusBadge(payment.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mb-2 fs-6">
          <div className="me-5">
            <strong>➧ Total Records: </strong> 
            <span className="text-success">{filteredPayments.length}</span>
          </div>
          <div>
            <strong>➧ Total Amount: </strong>
            <span className="text-success">{totalAmount.toFixed(2)} Tk</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accounts;