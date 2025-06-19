import { useEffect, useState } from "react";
import axios from "axios";

function AdminPendingUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/roomcloud/getPendingUsers.php")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPendingUsers(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setPendingUsers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching pending users:", err);
        setPendingUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = (id) => {
    axios
      .post("http://localhost/roomcloud/approveUser.php", { id })
      .then((res) => {
        if (res.data.success) {
          setPendingUsers((prev) => prev.filter((user) => user.id !== id));
        } else {
          alert("Failed to approve user.");
        }
      })
      .catch((err) => {
        console.error("Approval error:", err);
        alert("Error approving user.");
      });
  };

  const handleReject = (id) => {
    axios
      .post("http://localhost/roomcloud/rejectUser.php", { id })
      .then((res) => {
        if (res.data.success) {
          setPendingUsers((prev) => prev.filter((user) => user.id !== id));
        } else {
          alert("Failed to reject user.");
        }
      })
      .catch((err) => {
        console.error("Rejection error:", err);
        alert("Error rejecting user.");
      });
  };

  if (loading) return <p>Loading pending users...</p>;

  return (
    <div className="container mt-4">
      <h2>Pending User Verifications</h2>
      <table className="table table-bordered table-striped rounded">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Year Level</th>
            <th>Transcript File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.length > 0 ? (
            pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.year_level}</td>
                <td>
                  <a
                    href={`http://localhost/roomcloud/transcript/${user.transcript_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    View File
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(user.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(user.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No pending users.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPendingUsers;
