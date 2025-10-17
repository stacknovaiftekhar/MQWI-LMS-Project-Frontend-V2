import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utilities/ScrollToTop";
// Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Sadakah from './pages/Sadakah';
import Contact from "./pages/Contact";
import Activity from './pages/Activity';
import Coming from './pages/Coming';
// Auth
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import SignOut from './components/Auth/SignOut';
import ResetRequest from "./components/Auth/ResetRequest";
import ResetMessage from "./components/Auth/ResetMessage";
import ResetConfirm from "./components/Auth/ResetConfirm";
// Courses
import CourseDetail from './components/Home/Courses/CourseDetail';

// Admin Routes
import { adminRoutes } from './routes/adminRoutes';
// Staff Routes
import { staffRoutes } from './routes/staffRoutes';
// Users Routes
import { usersRoutes } from './routes/usersRoutes';
// Packages
import { ToastContainer } from 'react-toastify';
// Social Bar
import SocialBar from "./utilities/SocialBar";


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Panel Routes */}
        {adminRoutes}
        {/* Staff Panel Routes */}
        {staffRoutes}
        {/* Users Panel Routes */}
        {usersRoutes}

        {/* Auth Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/reset-request" element={<ResetRequest />} />
        <Route path="/reset-message" element={<ResetMessage />} />
        <Route path="/reset-confirm/:uid/:token" element={<ResetConfirm />} />

        {/* Pages Routes */}
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/activity" element={<Coming />} /> */}
        <Route path="/activity" element={<Coming />} />
        <Route path="/notice" element={<Coming />} />
        <Route path="/fatwa" element={<Coming />} />
        <Route path="/sadaqah" element={<Sadakah />} />
        <Route path="/contact" element={<Contact />} />

        {/* Courses Routes */}
        <Route path="/courses/:id/:title" element={<CourseDetail />} />

        <Route path="/temp" element={<Coming />} />
        <Route path="*" element={<h1 style={{ color: "red" }} className='text-center mt-5'> 404 Not Found </h1>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
      <SocialBar />
    </BrowserRouter>
  )
}

export default App;