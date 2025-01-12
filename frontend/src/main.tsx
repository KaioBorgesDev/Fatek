import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.tsx'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'
import { MessageProvider } from './context/MessageContext.tsx'
import { TokenProvider } from './context/TokenProvider.tsx'
import Sell from './routes/Sell.tsx'
import SellBook from './routes/SellBook.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        
      }
    ]
  },
  {
    path: "/login",
    children: [
      {
        path: "/login",
        element: <Login/>,
        
      }
    ]
  },
  {
    path: "/register",
    children: [
      {
        path: "/register",
        element: <Register/>,
        
      }
    ]
  },
  {
    element: <App></App>,
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
 
])

createRoot(document.getElementById('root')!).render(
  
  <TokenProvider>
    <MessageProvider>
      <StrictMode>
        <RouterProvider router={router}/>
      </StrictMode>
    </MessageProvider>
    </TokenProvider>
)
