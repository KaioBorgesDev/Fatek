import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMessage } from "../../context/MessageContext";
import { useToken } from "../../context/TokenProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./HomeAdmin.css";

// Registro dos componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockUsers = [
  { id: 1, name: "João Silva", email: "joao@email.com", active: true },
  { id: 2, name: "Maria Souza", email: "maria@email.com", active: true },
  { id: 3, name: "Carlos Lima", email: "carlos@email.com", active: false },
];

const userStats = [
  { month: "Jan", users: 30 },
  { month: "Feb", users: 50 },
  { month: "Mar", users: 70 },
  { month: "Apr", users: 90 },
  { month: "May", users: 120 },
];

const salesReport = [
  { month: "Jan", total: 12 },
  { month: "Feb", total: 19 },
  { month: "Mar", total: 8 },
  { month: "Apr", total: 15 },
  { month: "May", total: 22 },
  { month: "Jun", total: 17 },
];

const HomeAdmin = () => {
  const { message, setMessage } = useMessage();
  const { token } = useToken();
  const [users, setUsers] = useState(mockUsers);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponStatus, setCouponStatus] = useState("ativo");

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: couponCode,
          discount: parseFloat(couponDiscount),
          expiration_date: couponDate,
          status: couponStatus,
          role: "admin",
        }),
      });

      if (response.ok) {
        toast.success("Cupom criado com sucesso.");
        setCouponCode("");
        setCouponDiscount("");
        setCouponDate("");
        setCouponStatus("ativo");
      } else {
        const err = await response.json();
        toast.error(err.error || "Erro ao criar cupom.");
      }
    } catch (err) {
      toast.error("Erro ao conectar com o servidor.");
    }
  };



  useEffect(() => {
    if (message !== "") {
      toast.success(message);
      setMessage("");
    }
    fetchCategories();
  }, [message, setMessage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5002/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5002/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName,
          role: "admin",
        }),
      });

      if (response.ok) {
        toast.success("Categoria criada com sucesso.");
        setCategoryName("");
        fetchCategories();
      } else {
        const err = await response.json();
        toast.error(err.error || "Erro ao criar categoria.");
      }
    } catch (err) {
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  const inactivateUser = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active: false } : user))
    );
    toast.info("Usuário inativado com sucesso.");
  };

  const chartData = {
    labels: userStats.map((d) => d.month),
    datasets: [
      {
        label: "Usuários",
        data: userStats.map((d) => d.users),
        fill: false,
        borderColor: "#00c46a",
        backgroundColor: "#00c46a",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
        grid: { color: "#444" },
      },
      y: {
        ticks: { color: "#ffffff" },
        grid: { color: "#444" },
      },
    },
  };

  const salesChartData = {
    labels: salesReport.map((item) => item.month),
    datasets: [
      {
        label: "Vendas",
        data: salesReport.map((item) => item.total),
        backgroundColor: "#007bff",
        borderRadius: 6,
      },
    ],
  };

  const salesChartOptions = chartOptions;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>

      <div className="dashboard-cards">
        <div className="card">
          <p className="card-label">Usuários Ativos</p>
          <p className="card-value">{users.filter((u) => u.active).length}</p>
        </div>
        <div className="card">
          <p className="card-label">Total de Livros</p>
          <p className="card-value">328</p>
        </div>
        <div className="card">
          <p className="card-label">Pedidos</p>
          <p className="card-value">142</p>
        </div>
      </div>

      <div className="card">
        <h2 className="chart-title">Crescimento de Usuários</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="card">
        <h2 className="chart-title">Relatórios de Vendas</h2>
        <Bar data={salesChartData} options={salesChartOptions} />
      </div>

      <div className="card">
        <h2 className="table-title">Gerenciar Usuários</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ color: "#fff" }}>{user.name}</td>
                <td style={{ color: "#fff" }}>{user.email}</td>
                <td className={user.active ? "status-active" : "status-inactive"}>
                  {user.active ? "Ativo" : "Inativo"}
                </td>
                <td>
                  <button
                    onClick={() => inactivateUser(user.id)}
                    disabled={!user.active}
                    className="inactivate-button"
                  >
                    Inativar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULÁRIO DE CATEGORIAS */}
      <div className="card">
        <h2 className="table-title">Criar Categoria</h2>
        <form onSubmit={handleCreateCategory} className="category-form">
          <input
            type="text"
            placeholder="Nome da categoria"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="category-input"
          />
          <button type="submit" className="inactivate-button">Criar</button>
        </form>
      </div>

      <div className="card">
        <h2 className="table-title">Categorias Existentes</h2>
        <ul style={{ color: "#fff" }}>
          {categories.map((cat: { id_category: string, name: string }) => (
            <li key={cat.id_category}>• {cat.name}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2 className="table-title">Criar Cupom</h2>
        <form onSubmit={handleCreateCoupon} className="category-form">
          <input
            type="text"
            placeholder="Código do cupom"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
            className="category-input"
          />
          <input
            type="number"
            placeholder="Desconto (%)"
            value={couponDiscount}
            onChange={(e) => setCouponDiscount(e.target.value)}
            required
            className="category-input"
            min={0}
            max={100}
          />
          <input
            type="date"
            placeholder="Data de expiração"
            value={couponDate}
            onChange={(e) => setCouponDate(e.target.value)}
            required
            className="category-input"
          />
          <select
            value={couponStatus}
            onChange={(e) => setCouponStatus(e.target.value)}
            className="category-input"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          <button type="submit" className="inactivate-button">Criar Cupom</button>
        </form>
      </div>
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

export default HomeAdmin;
