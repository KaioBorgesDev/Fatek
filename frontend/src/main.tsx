import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home.tsx"
import Login from "./routes/Login.tsx"
import Register from "./routes/Register.tsx"
import { MessageProvider } from "./context/MessageContext.tsx"
import { TokenProvider } from "./context/TokenProvider.tsx"
import Sell from "./routes/Sell.tsx"
import SellBook from "./routes/SellBook.tsx"
import BookRoute from "./routes/BookRoute.tsx"
import CheckoutRoute from "./routes/CheckoutRoute.tsx"
import PaymentRoute from "./routes/PaymentRoute.tsx"
import BuyBookRoute from "./routes/BookRoute.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "comprar/:id", // ✅ NOVA ROTA
        element: <BuyBookRoute />,
      }
    ]
  },
  {
    path: "/login",
    children: [
      {
        path: "/login",
        element: <Login />,
      }
    ]
  },
  {
    path: "/register",
    children: [
      {
        path: "/register",
        element: <Register />,
      }
    ]
  },
  {
    element: <App />,
    path: "/sell",
    children: [
      {
        path: "",
        element: <Sell />,
      },
      {
        path: "book",
        element: <SellBook />,
      },
    ]
  },
  {
    path: "/library",
    children: [
      {
        path: "",
        element: <BookRoute />,
      }
    ]
  },
  {
    path: "/checkout",
    children: [
      {
        path: "",
        element: <CheckoutRoute />,
      },
      {
        path: "payment",
        element: <PaymentRoute />,
      }
    ]
  },
])

createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <MessageProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </MessageProvider>
  </TokenProvider>
)
