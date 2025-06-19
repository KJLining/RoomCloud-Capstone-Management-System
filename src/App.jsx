import { Routes, Route } from 'react-router-dom';

import Signup from './ClientPages/Signup';
import ForgotPassword from './ClientPages/ForgotPassword';
import Login from './ClientPages/Login';
import ForgotPassword2 from './ClientPages/ForgotPassword2';
import JoinUs from './ClientPages/JoinUs';
import Privacy from './ClientPages/Privacy';

import AdminLayout from './AdminPages/AdminLayout';
import AdminLogin from './AdminPages/AdminLogin';
import AdminDashboard from './AdminPages/AdminDashboard';
import AdminUsers from './AdminPages/AdminUsers';
import AdminPendingUsers from './AdminPages/AdminPendingUsers';
import AdminFiles from './AdminPages/AdminFiles';
import AdminPendingFiles from './AdminPages/AdminPendingFiles';


import FooterPagesClient from './ClientPages/components/FooterPagesClient';
import FAQ from './ClientPages/FAQ';
import ClientLayout from './ClientPages/components/ClientLayout';
import Dashboard from './ClientPages/Dashboard';
import Directory from './ClientPages/Directory';
import MyProfile from './ClientPages/MyProfile';
import Capstone from './ClientPages/Capstone';
import Notifications from './ClientPages/Notifications'

import TestCors from './TestCors';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/ForgotPassword2" element={<ForgotPassword2 />} />     
      
      <Route element={<FooterPagesClient />}>
       <Route path="/joinus" element={<JoinUs />} />
       <Route path="/privacy" element={<Privacy />} />
       <Route path="/faq" element={<FAQ />} />
      </Route>

      <Route element={<ClientLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/capstone" element={<Capstone />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route element={<AdminLayout />}>
        <Route path="/admindashboard" element={<AdminDashboard />}/>
        <Route path="/adminusers" element={<AdminUsers />}/>
        <Route path="/adminpendingusers" element={<AdminPendingUsers />}/>
        <Route path="/adminfiles" element={<AdminFiles />}/>
        <Route path="/adminpendingfiles" element={<AdminPendingFiles />}/>
      </Route>

      <Route path="/testcors" element={<TestCors />} />
    </Routes>



  );
}

export default App;
