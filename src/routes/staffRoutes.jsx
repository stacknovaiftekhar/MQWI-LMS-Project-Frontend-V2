import { Route } from 'react-router-dom';

/* Staff Panel Start */
import StaffRoute from './StaffRoute';
import StaffPanel from '../components/Staff/StaffPanel';
import SignOut from '../components/Auth/SignOut';
// Profile
import Profile from '../components/Staff/Pages/Profile';
import ProfileUpdate from '../components/Staff/Pages/Profile/ProfileUpdate';
// Course
import Courses from '../components/Staff/Pages/Courses';
import ModuleCard from '../components/Admin/pages/Courses/ModuleCard';
import ModuleForm from '../components/Admin/pages/Courses/ModuleForm';
import LessonForm from '../components/Admin/pages/Courses/LessonForm';


export const staffRoutes = [
  <Route path="/teacher" element={<StaffRoute />} key={998}>
    {/* Staff Panel Routes */}
    <Route path="" element={<StaffPanel />}>
      <Route path="profile" element={<Profile />}>
        <Route path="edit" element={<ProfileUpdate />} />
      </Route>
      <Route path="courses" element={<Courses />} />      
      {/* Modules */}
      <Route path="courses/:id/modules" element={<ModuleCard />}>
        <Route path="create" element={<ModuleForm />} />
        <Route path="update/:mid" element={<ModuleForm />} />
        <Route path=":mid/lessons/create" element={<LessonForm />} />
        <Route path=":mid/lessons/update/:lid" element={<LessonForm />} />
      </Route>

      {/* Logout */}
      <Route path="signout" element={<SignOut />} />
    </Route>
    {/* Users Panel End */}
  </Route>
];




// Modules Page
// import ModulesPage from '../components/Users/Pages/Course/ModulesPage';
