import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // coração cheio e vazio
import { useToken } from "../../context/TokenProvider";

type WishButtonProps = {
  bookId: string;
};

const WishButton: React.FC<WishButtonProps> = ({ bookId }) => {
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
 

  const handleClick = async () => {
    if (!token) {
      toast.error("Você precisa estar logado para adicionar à wishlist!");
      return;
    }

    if (added) {
      toast.info("Este livro já está na sua wishlist.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5002/wish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_book: bookId,
        }),
      });
      console.log(response)
      if (!response.ok) throw new Error("Falha ao adicionar na wishlist");

      setAdded(true);
      toast.success("Livro adicionado à sua wishlist!");
    } catch (error) {
      console.log(error)
      toast.error("Ops! Não foi possível adicionar na wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "1.5rem",
        color: added ? "red" : "gray",
        transition: "color 0.3s ease",
      }}
      aria-label={added ? "Removido da wishlist" : "Adicionar à wishlist"}
      title={added ? "Na wishlist" : "Adicionar à wishlist"}
    >
      {added ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default WishButton;
