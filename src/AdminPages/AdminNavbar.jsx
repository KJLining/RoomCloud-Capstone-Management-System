import { Link } from 'react-router-dom';
import RoomCloudLogo from '../ClientPages/images/Room Cloud logo png.png'

function AdminNavbar(){
    return(
    <nav className=" navbar navbar-fixed-top navbar-expand-md text-white bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand text-white" href="admin_dashboard.html">
                <img src={RoomCloudLogo} alt="Room|Cloud" style={{height: "30px", width: "30px"}}
                    className="d-inline-block align-text-top" />
                Room|Cloud
            </a>
            <button className="navbar-toggler btn-outline-light" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavAltMarkup">
                <div className="navbar-nav me-md-4 align-items-center">
                    <Link to="/admindashboard" className="nav-link me-4 text-white">Dashboard</Link>
                    <Link to="/adminusers" className="nav-link me-4 text-white">Users</Link>
                    <Link to="/adminfiles" className="nav-link me-4 text-white">Files</Link>
                    <Link to="/adminpendingusers" className="nav-link me-4 text-white">Pending Users</Link>
                    <Link to="/adminpendingfiles" className="nav-link me-4 text-white">Pending Files</Link>
                     <Link to="/adminlogin" className="nav-link me-4 text-white">Logout</Link>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default AdminNavbar;