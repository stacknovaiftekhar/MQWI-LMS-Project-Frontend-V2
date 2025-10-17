# 🎓 Markazul Quran Wassunnah Institute (MQWI) - LMS Frontend

**Learning Management System (LMS) Frontend** built for **Markazul Quran Wassunnah Institute** using **React.js**, **JavaScript**, **Bootstrap**, **HTML**, and **CSS**.  

This frontend interfaces with the Django REST API backend to deliver a smooth, responsive, and interactive learning experience for students, teachers, and administrators.

---

## 🚀 Features

- **Responsive Multi-Role Dashboard**
  - Separate dashboards for **Admin**, **Teachers**, and **Students**
  - Role-based route protection and dynamic navigation  

- **Admin Panel**
  - Manage Teachers, Students, Categories, Courses, Modules, Lessons, Payments, and Sadaqah  
  - Integrated DataTables for record display, search, and delete functionality  
  - Sidebar with icons, toggle feature, and modern green-themed UI  

- **Course & Lesson System**
  - View all courses by category  
  - Interactive lesson player with completion tracking  
  - Module-wise lesson progression  

- **Enrollment & Payment**
  - Secure course enrollment via integrated payment gateways  
  - Supported gateways: **Bkash**, **Nagad**, **Rocket**, **Islami Bank**  
  - Registration and monthly payment handling with modal-based UI  

- **Invoice Management**
  - Display and download invoices linked with payments  
  - Auto-refresh upon payment verification or invoice deletion  

- **User Authentication**
  - JWT-based login and registration  
  - Access/Refresh tokens stored in `localStorage`  
  - Protected API requests with Authorization headers  

- **Contact & Sadaqah Forms**
  - Public forms for donations (Sadaqah) and contact messages  
  - File upload support and visual feedback for actions  

- **Mobile Friendly & Optimized**
  - Fully responsive layout using **Bootstrap Grid**  
  - Adaptive design for desktop, tablet, and mobile views  

---

## 🛠️ Technologies Used

### **Core Framework**
- React.js (18+)
- JavaScript (ES6+)

### **UI & Styling**
- Bootstrap 5
- HTML5
- CSS3
- Font Awesome Icons
- Responsive Grid & Utility Classes

### **State & API Handling**
- React Router DOM (Routing)
- Axios (API Requests)
- LocalStorage (Token Management)

### **Animation & UX Enhancements**
- React Modal / Bootstrap Modal
- Conditional Rendering and Loading States

### **Backend Integration**
- Django REST Framework API

---

## 🌟 Key Components & Pages
- AdminDashboard.jsx – Main admin layout with Sidebar & Outlet
- Teachers.jsx / Students.jsx – CRUD management for users
- Category.jsx / Courses.jsx – Course structure management
- EnrollForm.jsx – Dynamic enrollment with payment gateway selection
- PaymentCard.jsx – View, verify, and manage payments
- SadaqahForm.jsx – User donation interface
- ModulesPage.jsx – Course module with “Mark as Complete” feature

---

## 📚 What We Learned
- Building modular React components for scalability
- Managing authentication & route protection using JWT tokens
- Integrating frontend with Django REST APIs
- Handling file uploads and media rendering
- Implementing CRUD with Axios and React Hooks
- Designing dashboards with Bootstrap and responsive layouts
- Improving user experience using modal interactions and hover effects
- Deploying production build on cPanel with proper routing configuration

---

## 👨‍💻 Author
IFTEKHAR HASAN

👨‍💻 Developer & Maintainer

📧 admin@markazulquranwassunnah.com

🌐 markazulquranwassunnah.com

---

## 📝 License
This project is for educational and institutional use under the Markazul Quran Wassunnah Institute.

Unauthorized commercial use is prohibited.

---

✅ Frontend Deployed: https://markazulquranwassunnah.com

---
