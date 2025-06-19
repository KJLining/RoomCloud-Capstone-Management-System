import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import RoomCloudLogo from '../images/Room Cloud logo png.png';

function ClientDashboardNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <aside id="sidebar" className={`vh-100 overflow-y-hidden ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="d-flex align-items-center">
        <button className="toggle-btn" type="button" onClick={handleToggle}>
          <img src={RoomCloudLogo} id="roomcloudlogo" alt="RoomCloud Logo" />
        </button>
        {!isCollapsed && (
          <div className="sidebar-logo">
            <a>RoomCloud</a>
          </div>
        )}
      </div>
      <ul className="sidebar-nav">
        <Link to="/dashboard">
        <li className="sidebar-item" id="active">
          <a href="user dashboard.html" className="sidebar-link">
            <i><ion-icon name="home-outline" className="text-white"></ion-icon></i>
            {!isCollapsed && <span>Dashboard</span>}
          </a>
        </li>
        </Link>
        <Link to="/directory">
          <li className="sidebar-item">
            <a href="directory.html" className="sidebar-link">
              <i><ion-icon name="folder-outline" className="text-white"></ion-icon></i>
              {!isCollapsed && <span>Directory</span>}
            </a>
          </li>       
        </Link>
        <Link to="/myprofile">
        <li className="sidebar-item">
          <a href="myprofile.html" className="sidebar-link">
            <ion-icon name="person-outline" id="outline"></ion-icon>
            {!isCollapsed && <span className="ms-3">My Profile</span>}
          </a>
        </li>        
        </Link>
        <Link to="/capstone">
        <li className="sidebar-item">
          <a href="capstone.html" className="sidebar-link">
            <i><ion-icon name="document-outline" className="text-white"></ion-icon></i>
            {!isCollapsed && <span>My Capstone</span>}
          </a>
        </li>
        </Link>
        <Link to="notifications">
        <li className="sidebar-item">
          <a href="notification.html" className="sidebar-link">
            <i><ion-icon name="notifications-outline" className="text-white"></ion-icon></i>
            {!isCollapsed && <span>Notification</span>}
          </a>
        </li>
        </Link>
        <Link to="/">
        <li className="sidebar-item">
          <a href="login.php" className="sidebar-link">
            <i><ion-icon name="power-outline" className="text-white"></ion-icon></i>
            {!isCollapsed && <span>Log-out</span>}
          </a>
        </li>
        </Link>
      </ul>
    </aside>
  );
}

export default ClientDashboardNav;
