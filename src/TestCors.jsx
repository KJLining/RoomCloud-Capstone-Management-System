import React, { useEffect } from 'react';
import axios from 'axios';

function TestCors() {
  useEffect(() => {
    axios.get("http://localhost/roomcloud/test_cors.php", {
      withCredentials: true, // session test
    })
    .then(response => {
      console.log("✅ CORS Success:", response.data);
      alert("Success: " + JSON.stringify(response.data));
    })
    .catch(error => {
      console.error("❌ CORS Failed:", error);
      alert("Failed: " + (error.response?.data?.error || error.message));
    });
  }, []);

  return (
    <div>
      <h2>CORS Test Page</h2>
      <p>Check the console and alert popup.</p>
    </div>
  );
}

export default TestCors;