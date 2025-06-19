import { useEffect, useState } from "react";
import axios from "axios";

function AdminFiles() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost/roomcloud/getCapstones.php");
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.post("http://localhost/roomcloud/deleteCapstone.php", { id });
      setFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  };

  const filteredFiles = files.filter(
    (file) =>
      file.title.toLowerCase().includes(search.toLowerCase()) ||
      file.author1.toLowerCase().includes(search.toLowerCase()) ||
      file.file_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <form
        className="d-flex mt-3 mb-3"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="form-control me-2 w-25"
          type="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>

      <table className="table table-bordered table-striped table-responsive rounded">
        <thead className="table-dark">
          <tr>
            <th>File Name</th>
            <th>ID</th>
            <th>Date</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file) => (
            <tr key={file.id}>
              <td>{file.title}</td>
              <td>{file.id}</td>
              <td>{new Date(file.upload_date).toLocaleDateString()}</td>
              <td>{file.author1}</td>
              <td>
                <a
                  className="btn btn-primary p-1 rounded me-2"
                  href={`http://localhost/roomcloud/uploads/${file.file_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                <button
                  className="btn btn-danger p-1 rounded"
                  onClick={() => handleDelete(file.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminFiles;