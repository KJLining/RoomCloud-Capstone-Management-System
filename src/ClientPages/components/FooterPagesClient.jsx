import FootBotNav from './FootBotNav';
import FooterNav from './FooterNav';
import { Outlet } from 'react-router-dom';

const FooterPagesClient = () => (
  <>
    <FooterNav />
    <main className='container-fluid' style={{backgroundColor:"#86A7FC", minHeight:"100%", marginTop:"4.1rem", padding:"0.5rem"}}>
    <Outlet />
    </main>
    <FootBotNav />
  </>
);

export default FooterPagesClient;
