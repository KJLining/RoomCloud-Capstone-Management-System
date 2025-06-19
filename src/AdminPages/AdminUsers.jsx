import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost/roomcloud/getAllUsers.php")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.post("http://localhost/roomcloud/deleteUser.php", { id })
        .then(() => {
          alert("User deleted successfully.");
          fetchUsers();
        })
        .catch(err => console.error("Delete failed:", err));
    }
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <form className="d-flex mt-3 mb-3" role="search" onSubmit={e => e.preventDefault()}>
        <input
          className="form-control me-2 w-25"
          type="search"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <table className="table table-striped table-responsive rounded">
        <thead className="table-dark">
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Year Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No users found.</td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.year_level}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => alert(`User Info:\nName: ${user.first_name} ${user.last_name}\nEmail: ${user.email}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default AdminUsers;
