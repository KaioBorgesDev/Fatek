import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../context/TokenProvider";
import "./EventBanner.css";

interface Event {
  id_event: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
}

const EventBanner: React.FC = () => {
  const { token } = useToken();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!token) return;

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5002/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filtra só eventos ativos e com data válida (opcional)
        const activeEvents = response.data.filter(
          (e: Event) => e.status === "ativo"
        );

        setEvents(activeEvents);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEvents();
  }, [token]);

  useEffect(() => {
    if (events.length <= 1) return; // Se só tiver 0 ou 1 evento, não precisa rotacionar

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // 5 segundos

    return () => clearInterval(intervalId);
  }, [events]);

  if (events.length === 0) return null;

  const event = events[currentIndex];

  return (
    <div className="event-banner">
      <p>{event.name}</p>
      <p>{event.description}</p>
      <small>
        {new Date(event.start_date).toLocaleDateString()} -{" "}
        {new Date(event.end_date).toLocaleDateString()}
      </small>
    </div>
  );
};

export default EventBanner;
