import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import ClientDashboardNav from "./ClientDashboardNav";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./style.css";

const ClientLayout = () => {
  const { user } = useAuth();
  const [bannerMessage, setBannerMessage] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const latestId = useRef(0);
  const audioRef = useRef(null);
  const bannerTimeout = useRef(null);

  // Wait for first user click to allow sound
  useEffect(() => {
    const unlockAudio = () => {
      audioRef.current = new Audio("/notification.mp3");
      setHasInteracted(true);
      document.removeEventListener("click", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);
    return () => document.removeEventListener("click", unlockAudio);
  }, []);

  // Global notification poller
  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost/roomcloud/getNotifications.php?userId=${user.id}`
        );
        const newNotifs = res.data;

        if (newNotifs.length > 0 && newNotifs[0].id > latestId.current) {
          const message = newNotifs[0].message;
          latestId.current = newNotifs[0].id;

          // Play sound
          if (hasInteracted && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) =>
              console.warn("Audio play failed:", err)
            );
          }

          // Show banner
          setBannerMessage(message);
          clearTimeout(bannerTimeout.current);
          bannerTimeout.current = setTimeout(() => setBannerMessage(null), 5000);
        }
      } catch (err) {
        console.error("Notification fetch failed:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [user, hasInteracted]);

  return (
    <div className="wrapper">
      <ClientDashboardNav />

      {/* Global Notification Banner */}
      {bannerMessage && (
        <div className="notification-banner">
          <strong>📢 Notification:</strong> {bannerMessage}
        </div>
      )}

      <main className="main p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
