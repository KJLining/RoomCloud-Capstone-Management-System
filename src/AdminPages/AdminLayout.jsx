import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <>
    <AdminNavbar />
    <main className='p-3'>
    <Outlet />
  </main>
  </>
);

export default AdminLayout;