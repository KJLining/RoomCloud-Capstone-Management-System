import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost/roomcloud/getNotifications.php?userId=${user.id}`
        );
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 1000);
    return () => clearInterval(interval);
  }, [user.id]);

  return (
    <div className="container mt-4">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((notif) => (
            <li key={notif.id} className="list-group-item">
              <strong>{new Date(notif.created_at).toLocaleString()}:</strong>{" "}
              {notif.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
