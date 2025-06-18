import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMessage } from "../../context/MessageContext";
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

// Dados mockados
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
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    if (message !== "") {
      toast.success(message);
      setMessage("");
    }
  }, [message, setMessage]);

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
      title: {
        display: false,
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

  const salesChartOptions = {
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
                <td
                  className={user.active ? "status-active" : "status-inactive"}
                >
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
    </div>
  );
};

export default HomeAdmin;
  