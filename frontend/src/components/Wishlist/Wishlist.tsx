import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useToken } from "../../context/TokenProvider";
import "./WishList.css"; // Importa o CSS criado

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    cover_image: string;
}

interface WishItem {
    id: string;
    added_date: string;
    book: Book;
}

const WishList = () => {
    const [wishlist, setWishlist] = useState<WishItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useToken();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!token) return;

            try {
                const response = await axios.get<WishItem[]>("http://localhost:5002/wishlist", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (Array.isArray(response.data)) {
                    setWishlist(response.data);
                } else {
                    setWishlist([]);
                    toast.error("Resposta da wishlist inválida.");
                }
            } catch (error) {
                toast.error("Erro ao carregar a wishlist.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [token]);

    return (
        <div className="wishlist-container">
            <h2 className="wishlist-title">Minha Wishlist</h2>

            {loading ? (
                <p className="loading-text">Carregando...</p>
            ) : Array.isArray(wishlist) && wishlist.length > 0 ? (
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-card">
                            <img
                                src={"/assets/book-6.jpg"}
                                alt={item.book.title}
                                className="wishlist-image"
                            />
                            <div className="wishlist-content">
                                <h3 className="wishlist-book-title">{item.book.title}</h3>
                                <p className="wishlist-author">Autor: {item.book.author}</p>
                                <p className="wishlist-price">
                                    R$ {Number(item.book.price).toFixed(2)}
                                </p>
                                <p className="wishlist-date">
                                    Adicionado em: {new Date(item.added_date).toLocaleDateString("pt-BR")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-text">Sua wishlist está vazia.</p>
            )}

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default WishList;
