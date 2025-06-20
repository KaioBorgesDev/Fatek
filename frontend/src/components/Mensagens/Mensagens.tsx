import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../context/TokenProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Mensagens.css";

interface Message {
    id_message: number;
    id_user: string;
    message: string;
    response: string | null;
    status: "aberto" | "fechado";
    created_at: string;
}

export const Mensagens = () => {
    const { token } = useToken();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");

    const fetchMessages = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await axios.get<Message[]>("http://localhost:5002/messages", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
        } catch (error) {
            toast.error("Erro ao carregar mensagens.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [token]);

    const handleCreate = async () => {
        if (!newMessage.trim()) {
            toast.error("Mensagem não pode estar vazia.");
            return;
        }
        try {
            await axios.post(
                "http://localhost:5002/messages",
                { message: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Mensagem enviada!");
            setNewMessage("");
            fetchMessages();
        } catch (error) {
            toast.error("Erro ao enviar mensagem.");
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5002/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Mensagem deletada!");
            fetchMessages();
        } catch (error) {
            toast.error("Erro ao deletar mensagem.");
            console.error(error);
        }
    };

    return (
        <div className="mensagens-container">
            <h2 style={{ color: "white" }}>Minhas Mensagens</h2>

            <div className="new-message-box">
                <textarea
                    rows={3}
                    placeholder="Escreva uma nova mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleCreate} className="btn-create">
                    Enviar Mensagem
                </button>
            </div>

            {loading ? (
                <p style={{ color: "white" }}>Carregando mensagens...</p>
            ) : messages.length > 0 ? (
                <div className="mensagens-grid">
                    {messages.map((msg) => (
                        <div key={msg.id_message} className="mensagens-card">
                            <p style={{ color: "black" }}>Mensagem: {msg.message}</p>
                            <p style={{ color: "black" }}>Status: {msg.status}</p>
                            <p style={{ color: "black" }}>Data: {new Date(msg.created_at).toLocaleString("pt-BR")}</p>
                            {msg.response && (
                                <p style={{ color: "black" }}><strong>Resposta:</strong> {msg.response}</p>
                            )}
                            <div className="mensagens-btn-group">
                                <button onClick={() => handleDelete(msg.id_message)} className="btn-delete">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: "white" }}>Nenhuma mensagem encontrada.</p>
            )}

            <ToastContainer />
        </div>
    );
};
