import VerificationForm from "./VerificationForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { textboxStyles } from "./textboxStyles";
import { Link } from "react-router-dom";

function Capstone() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [capstoneTitle, setCapstoneTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [author1, setAuthor1] = useState("");
  const [author2, setAuthor2] = useState("");
  const [author3, setAuthor3] = useState("");
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState("");
  const [capstoneUploaded, setCapstoneUploaded] = useState(false);
  const [capstoneApproved, setCapstoneApproved] = useState(false);
  const [approvalShown, setApprovalShown] = useState(false);

  // Auto-refresh user verification status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost/roomcloud/getUserById.php?id=${user.id}`);
        const updated = res.data;

        if (
          updated &&
          (updated.verification_status !== user.verification_status ||
            updated.first_name !== user.first_name ||
            updated.last_name !== user.last_name)
        ) {
          setUser(updated);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser(); // initial fetch
    const interval = setInterval(fetchUser, 2000); // auto-refresh every 2s
    return () => clearInterval(interval);
  }, [user.id]);

  // Auto-refresh capstone upload status
  useEffect(() => {
    const fetchCapstone = async () => {
      try {
        const res = await axios.get(`http://localhost/roomcloud/getUserCapstone.php?userId=${user.id}`);
        const capstone = res.data;

        if (capstone) {
          setCapstoneUploaded(true);
          const approved = capstone.approved === "1";
          setCapstoneApproved(approved);

          if (!approvalShown && approved) {
            setApprovalShown(true);
            setNotification("🎉 Your capstone has been approved by the admin!");
          } else if (!approvalShown && !approved) {
            setNotification("✅ Your capstone has been submitted and is awaiting admin approval.");
          }
        }
      } catch (err) {
        console.error("Error fetching capstone data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapstone(); // initial fetch
    const interval = setInterval(fetchCapstone, 1000); // auto-refresh every 1s
    return () => clearInterval(interval);
  }, [user.id, approvalShown]);

  const handleCapstoneUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id);
    formData.append("title", capstoneTitle);
    formData.append("abstract", abstract);
    formData.append("author1", author1);
    formData.append("author2", author2);
    formData.append("author3", author3);

    try {
      await axios.post("http://localhost/roomcloud/uploadCapstone.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCapstoneUploaded(true);
      setNotification("✅ Your capstone has been submitted and is awaiting admin approval.");
      setApprovalShown(true);

      await axios.post("http://localhost/roomcloud/addNotification.php", {
        userId: user.id,
        message: "✅ Your capstone has been submitted and is awaiting admin approval.",
      });
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed.");
    }
  };

  if (loading) return <p>Loading...</p>;

  if (user.verification_status === "pending") {
    return (
      <div className="alert alert-info mt-3">
        <p>Your verification request is pending approval. Please wait for admin review.</p>
      </div>
    );
  }

  if (user.verification_status !== "verified") {
    return (
      <div className="alert alert-warning mt-3">
        <p className="mb-3">You are not yet verified as a 4th year student. Please submit your transcript for verification.</p>
        <VerificationForm
          onSubmitted={async () => {
            setNotification("Transcript submitted. Awaiting admin approval.");
            await axios.post("http://localhost/roomcloud/addNotification.php", {
              userId: user.id,
              message: "📄 Your transcript has been submitted and is awaiting admin approval.",
            });
          }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="col-12 d-flex justify-content-end align-items-center">
        <Link to="/myprofile"><ion-icon name="person-outline" size="large" className='fw-light m-2 fs-4'></ion-icon></Link>
        <p>{user.first_name} {user.last_name}</p>
        <Link to="/notifications"><ion-icon name="notifications-outline" className='ms-3 fs-4' size="large"></ion-icon></Link>
      </div>

      <h1 className="fw-bold">Ready to publish your capstone?</h1>

      {notification && (
        <div className={`alert ${capstoneApproved ? "alert-success" : "alert-info"} mt-3`}>
          {notification}
        </div>
      )}

      {!capstoneUploaded && !capstoneApproved && (
        <form className="mt-3" onSubmit={handleCapstoneUpload}>
          <h1>Capstone Title</h1>
          <div style={textboxStyles.entryarea} className="mb-4 w-75">
            <input
              type="text"
              value={capstoneTitle}
              onChange={(e) => setCapstoneTitle(e.target.value)}
              style={{
                ...textboxStyles.input,
                ...(capstoneTitle ? textboxStyles.inputFocusOrValid : {}),
              }}
              required
            />
            <label
              style={{
                ...textboxStyles.labelline,
                ...(capstoneTitle ? textboxStyles.labelActive : {}),
              }}
            >
              Enter title
            </label>
          </div>

          <h1>Abstract</h1>
          <div className="mb-4 w-75">
            <textarea
              className="form-control"
              rows="5"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Type your abstract here..."
              required
            ></textarea>
          </div>

          <h1>Authors</h1>
          {[author1, author2, author3].map((val, i) => (
            <div key={i} style={textboxStyles.entryarea} className="mb-4 w-75">
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  if (i === 0) setAuthor1(e.target.value);
                  else if (i === 1) setAuthor2(e.target.value);
                  else setAuthor3(e.target.value);
                }}
                style={{
                  ...textboxStyles.input,
                  ...(val ? textboxStyles.inputFocusOrValid : {}),
                }}
                required
              />
              <label
                style={{
                  ...textboxStyles.labelline,
                  ...(val ? textboxStyles.labelActive : {}),
                }}
              >
                Author {i + 1}
              </label>
            </div>
          ))}

          <h1>Capstone File</h1>
          <input
            type="file"
            className="form-control mb-4 w-75"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" className="btn btn-primary w-75">
            Submit Capstone
          </button>
        </form>
      )}
    </>
  );
}

export default Capstone;
