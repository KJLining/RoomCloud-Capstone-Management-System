import { useEffect, useState } from "react";
import axios from "axios";

function AdminPendingFiles() {
  const [pendingCapstones, setPendingCapstones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPendingCapstones = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost/roomcloud/getPendingCapstones.php");
      if (Array.isArray(res.data)) {
        setPendingCapstones(res.data);
      } else {
        console.error("Unexpected data format:", res.data);
        setPendingCapstones([]);
      }
    } catch (err) {
      console.error("Failed to fetch capstones:", err);
      setPendingCapstones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCapstones();
  }, []);

  const handleApprove = async (capstoneId, userId) => {
    try {
      await axios.post("http://localhost/roomcloud/approveCapstone.php", {
        capstoneId,
        userId,
      });
      fetchPendingCapstones();
    } catch (err) {
      console.error("Approve failed:", err);
      alert("Failed to approve capstone.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this capstone?")) return;
    try {
      await axios.post("http://localhost/roomcloud/deleteCapstone.php", { id });
      fetchPendingCapstones();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete capstone.");
    }
  };

  const filteredCapstones = pendingCapstones.filter((capstone) =>
    capstone.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <form className="d-flex mb-3" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2 w-25"
          type="search"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading pending capstones...</p>
      ) : filteredCapstones.length === 0 ? (
        <p>No pending capstones found.</p>
      ) : (
        <table className="table table-bordered table-striped table-responsive rounded">
          <thead className="table-dark">
            <tr>
              <th>File Name</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Authors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCapstones.map((capstone) => (
              <tr key={capstone.id}>
                <td>{capstone.title || "Untitled"}</td>
                <td>{capstone.user_id}</td>
                <td>{capstone.upload_date || "N/A"}</td>
                <td>
                  {[capstone.author1, capstone.author2, capstone.author3]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </td>
                <td>
                  <a
                    href={`http://localhost/roomcloud/${capstone.file_path}`}
                    className="btn btn-primary btn-sm me-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(capstone.id, capstone.user_id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(capstone.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPendingFiles;
