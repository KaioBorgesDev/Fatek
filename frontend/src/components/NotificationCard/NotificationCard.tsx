import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useToken } from "../../context/TokenProvider";
import axios from "axios";
import "./NotificationCard.css";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface Props {
  notificationActive: boolean;
  toggleNotification: () => void;
}

const NotificationCard: React.FC<Props> = ({ notificationActive, toggleNotification }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { token } = useToken();

  useEffect(() => {
    if (notificationActive && token) {
      fetchNotifications();
    }
  }, [notificationActive, token]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5002/notifications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  if (!notificationActive) return null;

  return (
    <div className="cart-overlay">
      <div className={`cart-card active`}>
        <div className="card-head">
          <h2>Notificações</h2>
          <button onClick={toggleNotification} className="close-cart">
            <IoClose size={20} />
          </button>
        </div>
        {notifications.length === 0 ? (
          <p>Nenhuma notificação</p>
        ) : (
          <ul>
            {notifications.map((note) => (
              <li key={note.id}>
                <strong>{note.title}</strong><br />
                <span>{note.message}</span><br />
                <small>{new Date(note.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
