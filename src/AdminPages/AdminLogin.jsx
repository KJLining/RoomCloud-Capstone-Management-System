import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RoomCloudLogo from '../ClientPages/images/Room Cloud logo png.png';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // make sure this is included

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios.post("http://localhost/roomcloud/adminLoginFunction.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // important if using cookies/session
      });

      if (response.data.success) {
        alert("Login successful!");
        navigate("/admindashboard");
      } else {
        alert("Login failed: " + (response.data.message || "Unknown error"));
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-light">
            <img
              src={RoomCloudLogo}
              alt="Room|Cloud"
              style={{ height: "30px", width: "30px" }}
              className="d-inline-block align-text-top"
            />
            Room|Cloud Admin
          </a>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="card w-25 mx-auto mt-5 text-center">
          <form onSubmit={handleLogin}>
            <div className="card-body border border-2 rounded-3 border-primary justify-content-center">
              <img
                src={RoomCloudLogo}
                alt="Logo"
                style={{ width: "4rem", height: "4rem" }}
                className="card-img mx-auto d-block mb-3"
              />
              <h2 className="fw-bold mb-3">Admin Login</h2>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
