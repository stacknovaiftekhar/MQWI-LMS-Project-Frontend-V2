import { Route } from 'react-router-dom';

/* Users Panel Start */
import UsersRoute from './UsersRoute';
import UsersPanel from '../components/Users/UsersPanel';
import Profile from '../components/Users/Pages/Profile';
import Courses from '../components/Users/Pages/Courses';
import Payment from '../components/Users/Pages/Payment';
import SignOut from '../components/Auth/SignOut';
// Profile Edit
import ProfileUpdate from '../components/Users/Pages/Profile/ProfileUpdate';
import EnrollForm from '../components/Home/Courses/EnrollForm';
// Modules Page
import ModulesPage from '../components/Users/Pages/Course/ModulesPage';
// Payment Form
import PaymentForm from '../components/Users/Pages/Payment/PaymentForm';
import PaymentCourse from '../components/Users/Pages/Payment/PaymentCourse';


export const usersRoutes = [
  <Route path="" element={<UsersRoute />} key={997}>
    {/* Users Panel Routes */}    
    <Route path="/dashboard" element={<UsersPanel />}>
      <Route path="profile" element={<Profile />} />
      <Route path="profile/edit" element={<ProfileUpdate />} />
      
      <Route path="courses" element={<Courses />} />
      {/* <Route path="courses/:id/modules" element={<Modules />} /> */}
      <Route path="courses/:id/:title" element={<ModulesPage />} />

      <Route path="payment" element={<Payment />} />
      <Route path="payment/enrolls" element={<PaymentCourse />}>
        <Route path=":eid" element={<PaymentForm />} />
      </Route>

      {/* Logout */}
      <Route path="signout" element={<SignOut />} />
    </Route>
    {/* Users Panel End */}
    <Route path="/courses/:id/enroll" element={<EnrollForm />} />
  </Route>
];
