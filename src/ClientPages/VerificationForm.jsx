import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function VerificationForm({ onSubmitted }) {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false); // ✅ Track submission state
  const [message, setMessage] = useState("");         // ✅ Show feedback
  const { user } = useAuth();
 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("transcript", file);
    formData.append("userId", user.id);

    try {
      await axios.post("http://localhost/roomcloud/requestVerification.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Verification request submitted successfully!");
      setSubmitted(true); // ✅ Disable form after submit
      onSubmitted?.();    // 🔔 Notify parent (optional)
    } catch (err) {
      setMessage("❌ Submission failed. Please try again.");
    }
     console.log("User object:", user);
  };

  return (
    <>
      {message && <div className="alert alert-info mt-3">{message}</div>}

      <form onSubmit={handleSubmit}>
        <label>Upload proof of verification</label>
        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files[0])}
          disabled={submitted} // ✅ disable after submission
        />
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={submitted || !file} // prevent resubmitting
        >
          {submitted ? "Submitted" : "Submit for Verification"}
        </button>
      </form>
    </>
  );
}

export default VerificationForm;
