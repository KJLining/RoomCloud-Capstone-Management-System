import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { textboxStyles } from "./textboxStyles";

function MyProfile() {
  const { user, login } = useAuth();
  const [file, setFile] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileInputRef = useRef();
  const [freshUser, setFreshUser] = useState(user);

  useEffect(() => {
    // Refetch user details to ensure all fields are loaded
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost/roomcloud/getUserById.php?id=${user?.id}`);
        if (res.data) {
          setFreshUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          login(res.data); // Update global context too
        }
      } catch (error) {
        console.error("Failed to refetch user data:", error);
      }
    };

    if (user?.id) {
      fetchUser();
    }
  }, [user?.id]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (file && freshUser) {
      handleUpload();
    }
  }, [file]);

  const handleUpload = async () => {
    if (!file || !freshUser) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("userId", freshUser.id);

    try {
      const res = await axios.post("http://localhost/roomcloud/uploadProfilePic.php", formData);
      if (res.data.success) {
        const updatedUser = { ...freshUser, profile_pic: res.data.path };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        login(updatedUser);
        setFreshUser(updatedUser);
      } else {
        console.error("Upload failed:", res.data.error);
        alert("Failed to upload profile picture.");
      }
    } catch (err) {
      console.error("Error during upload:", err);
      alert("Upload error occurred.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost/roomcloud/updatePassword.php", {
        userId: freshUser.id,
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        alert("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(response.data.error || "Password update failed.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <h2>Personal Details</h2>
      <div className="col-12 border p-3 bg-secondary-subtle rounded rounded-4">
        <div className="row">
          <div className="col-12 col-md-4 mb-3">
            <p>Full name: {freshUser?.name || "N/A"}</p>
            <p>Email: {freshUser?.email || "N/A"}</p>
            <p>Student number: {freshUser?.student_number || "N/A"}</p>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <p>Course: {freshUser?.course || "N/A"}</p>
            <p>Year: {freshUser?.year_level || "N/A"}</p>
            <p>Sex: {freshUser?.sex || "N/A"}</p>
          </div>
          <div className="col d-flex flex-column align-items-center justify-content-center text-center">
            {freshUser?.profile_pic && (
              <img
                src={`http://localhost/roomcloud/${freshUser.profile_pic}`}
                alt="Profile"
                className="img-fluid mb-3"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button onClick={handleButtonClick} className="btn btn-primary">
              Upload Profile Picture
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 bg-light border border-black border-3 rounded-3 p-3 mt-3">
        <h1>Change Password</h1>
        <form onSubmit={handlePasswordChange}>
          <div style={textboxStyles.entryarea} className="mb-4 w-75">
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{
                ...textboxStyles.input,
                ...(oldPassword ? textboxStyles.inputFocusOrValid : {}),
              }}
              required
            />
            <label
              style={{
                ...textboxStyles.labelline,
                ...(oldPassword ? textboxStyles.labelActive : {}),
              }}
            >
              Enter your old password
            </label>
          </div>

          <div style={textboxStyles.entryarea} className="mb-4 w-75">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                ...textboxStyles.input,
                ...(newPassword ? textboxStyles.inputFocusOrValid : {}),
              }}
              required
            />
            <label
              style={{
                ...textboxStyles.labelline,
                ...(newPassword ? textboxStyles.labelActive : {}),
              }}
            >
              Enter your new password
            </label>
          </div>

          <div style={textboxStyles.entryarea} className="mb-4 w-75">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                ...textboxStyles.input,
                ...(confirmPassword ? textboxStyles.inputFocusOrValid : {}),
              }}
              required
            />
            <label
              style={{
                ...textboxStyles.labelline,
                ...(confirmPassword ? textboxStyles.labelActive : {}),
              }}
            >
              Confirm your new password
            </label>
          </div>

          <button
            type="submit"
            className="btn text-white fw-bold w-75 align-self-center rounded-3 mb-3"
            style={{ backgroundColor: "#FF9874" }}
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
}

export default MyProfile;
