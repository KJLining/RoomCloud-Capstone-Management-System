import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
import bookimg from '../ClientPages/images/book.png';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [recentCapstones, setRecentCapstones] = useState([]);

  useEffect(() => {
    fetchRecentCapstones();
  }, []);

  const fetchRecentCapstones = async () => {
    try {
      const res = await axios.get("http://localhost/roomcloud/getCapstones.php");
      console.log("Capstones raw response:", res.data);
      if (Array.isArray(res.data)) {
        setRecentCapstones(res.data.filter(c => c.approved === "1" || c.approved === 1));
      } else {
        console.error("Unexpected capstone data:", res.data);
        setRecentCapstones([]);
      }
    } catch (error) {
      console.error("Failed to fetch capstones:", error);
    }
  };

  return (
    <>
      <div className='col-12 d-flex justify-content-end align-items-center'>
        <Link to="/myprofile">
          <ion-icon name="person-outline" size="large" className='fw-light m-2 fs-4'></ion-icon>
        </Link>
        <p>{user?.name}</p>
        <Link to="/notifications">
          <ion-icon name="notifications-outline" className='ms-3 fs-4' size="large"></ion-icon>
        </Link>
      </div>

      <div className='col-12 rounded rounded-3 p-3 mt-3 mb-3' style={{ backgroundColor: "#86A7FC" }}>
        <div className='row row-cols-2'>
          <div className='row align-content-center'>
            <h1 className='text-white'>Welcome {user?.name}!</h1>
            <p className='fw-light text-white'>Discover what inspires you today!</p>
          </div>
          <div className='row d-flex justify-content-end'>
            <img src={bookimg} style={{ width: "10rem", height: "8rem" }} alt="Book Illustration" />
          </div>
        </div>
      </div>

      <div className='d-flex flex-row align-content-center'>
        <ion-icon name="reload-circle-outline" className="fs-1 me-1"></ion-icon>
        <p className='fs-3 text-center'>Recents</p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {recentCapstones.map((capstone) => (
          <div className="col" key={capstone.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{capstone.title}</h5>
                <p className="card-text"><strong>Author:</strong> {capstone.author1}</p>
                <p className="card-text">
                  <strong>Date:</strong>{" "}
                  {capstone.upload_date
                    ? new Date(capstone.upload_date).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <a
                  className="btn btn-sm btn-primary"
                  href={`http://localhost/roomcloud/${capstone.file_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                <a
                  className="btn btn-sm btn-outline-secondary"
                  href={`http://localhost/roomcloud/download.php?file=${encodeURIComponent(capstone.file_name)}`}
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
