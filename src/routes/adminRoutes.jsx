import { Route } from 'react-router-dom';

/* Admin Panel Start */
import AdminRoute from './AdminRoute';
import AdminPanel from '../components/Admin/AdminPanel';
import Summary from '../components/Admin/Summary';
/* Sidebar Components */
import Teachers from '../components/Admin/Sidebar/Teachers';
import Students from '../components/Admin/Sidebar/Students';
import Category from '../components/Admin/Sidebar/Category';
import Courses from '../components/Admin/Sidebar/Courses';
import Enrolls from '../components/Admin/Sidebar/Enrolls';
import Payments from '../components/Admin/Sidebar/Payments';
import Accounts from '../components/Admin/Sidebar/Accounts';
import Contacts from '../components/Admin/Sidebar/Contacts';
import Messages from '../components/Admin/Sidebar/Messages';
import Sadaqah from '../components/Admin/Sidebar/Sadaqah';
import SignOut from '../components/Auth/SignOut';
// Teachers CRUD
import TeacherCreate from '../components/Admin/pages/Teachers/TeacherCreate';
import TeacherDetail from '../components/Admin/pages/Teachers/TeacherDetail';
import TeacherUpdate from '../components/Admin/pages/Teachers/TeacherUpdate';
// Students CRUD
import StudentDetail from '../components/Admin/pages/Students/StudentDetail';
// Category CRUD
import CategoryForm from '../components/Admin/pages/Category/CategoryForm';
// Courses CRUD
import CourseCard from '../components/Admin/pages/Courses/CourseCard';
import CourseForm from '../components/Admin/pages/Courses/CourseForm';
// Features CRUD
import FeatureForm from '../components/Admin/pages/Courses/FeatureForm';
// Modules CRUD
import ModuleCard from '../components/Admin/pages/Courses/ModuleCard';
import ModuleForm from '../components/Admin/pages/Courses/ModuleForm';
// Lessons CRUD
import LessonForm from '../components/Admin/pages/Courses/LessonForm';
// Payments CRUD
import PaymentCard from '../components/Admin/pages/Payments/PaymentCard';
import PaymentInfo from '../components/Admin/pages/Payments/PaymentInfo';
// Contact Forms
import ContactInfoForm from '../components/Admin/pages/Contacts/ContactInfoForm';
import SocialLinksForm from '../components/Admin/pages/Contacts/SocialLinksForm';
import WalletInfoForm from '../components/Admin/pages/Contacts/WalletInfoForm';
import BankDetailForm from '../components/Admin/pages/Contacts/BankDetailForm';
// Sadaqah CRUD
import SadaqahCard from '../components/Admin/pages/Sadaqah/SadaqahCard';
import PurposeCard from '../components/Admin/pages/Sadaqah/PurposeCard';
import PurposeForm from '../components/Admin/pages/Sadaqah/PurposeForm';
// Messages
import MessageCard from '../components/Admin/pages/Messages/MessageCard';
/* Admin Panel End */


export const adminRoutes = [
  <Route path="/admin" element={<AdminRoute />} key={999}>
  {/* <Route path="/admin/*" element={ <AdminRoute> <AdminDashboard /> </AdminRoute> }/> */}
    {/* Admin Panel Routes */}
    <Route path="" element={<AdminPanel />}>
      <Route index element={<Summary />} />
      {/* Teachers */}
      <Route path="teachers" element={<Teachers />}>
        <Route path="create" element={<TeacherCreate />} />
        <Route path="detail/:id" element={<TeacherDetail />} />
        <Route path="update/:id" element={<TeacherUpdate />} />
      </Route>

      {/* Students */}
      <Route path="students" element={<Students />}>
        <Route path="detail/:id" element={<StudentDetail />} />
      </Route>

      {/* Category */}
      <Route path="category" element={<Category />}>
        <Route path="create" element={<CategoryForm />} />
        <Route path="update/:id" element={<CategoryForm />} />
      </Route>

      {/* Courses */}
      <Route path="courses" element={<Courses />} />
      <Route path="courses/create" element={<CourseForm />} />
      <Route path="courses/update/:id" element={<CourseForm />} />
      <Route path="courses/detail/:id" element={<CourseCard />}>
        <Route path="features" element={<FeatureForm />} />
        <Route path="features/:fid" element={<FeatureForm />} />
      </Route>

      {/* Modules */}
      <Route path="courses/:id/modules" element={<ModuleCard />}>
        <Route path="create" element={<ModuleForm />} />
        <Route path="update/:mid" element={<ModuleForm />} />
        <Route path=":mid/lessons/create" element={<LessonForm />} />
        <Route path=":mid/lessons/update/:lid" element={<LessonForm />} />
      </Route>

      {/* Enrolls */}
      <Route path="enrolls" element={<Enrolls />} />
      <Route path="enrolls/:eid/payment" element={<PaymentInfo />}>
        <Route path=":pid/detail" element={<PaymentCard />} />
      </Route>

      {/* Payments */}
      <Route path="payments" element={<Payments />}>
        <Route path=":pid/detail" element={<PaymentCard />} />
      </Route>

      {/* Accounts */}
      <Route path="accounts" element={<Accounts />} />

      {/* Contacts */}
      <Route path="contacts" element={<Contacts />}>
        <Route path="contact-info" element={<ContactInfoForm />} />
        <Route path="social-links" element={<SocialLinksForm />} />
        <Route path="wallet-info" element={<WalletInfoForm />} />
        <Route path="wallet-info/:wid" element={<WalletInfoForm />} />
        <Route path="bank-detail" element={<BankDetailForm />} />
        <Route path="bank-detail/:bid" element={<BankDetailForm />} />
      </Route>

      {/* Messages */}
      <Route path="messages" element={<Messages />}>
        <Route path="detail/:mid" element={<MessageCard />} />
      </Route>

      {/* Sadaqah */}
      <Route path="sadaqah" element={<Sadaqah />}>
        <Route path="detail/:sid" element={<SadaqahCard />} />
      </Route>
      <Route path="sadaqah/purpose" element={<PurposeCard />}>
        <Route path="create" element={<PurposeForm />} />
        <Route path="update/:pid" element={<PurposeForm />} />
      </Route>

      {/* Logout */}
      <Route path="signout" element={<SignOut />} />
    </Route>
    {/* Admin Panel End */}
  </Route>
];