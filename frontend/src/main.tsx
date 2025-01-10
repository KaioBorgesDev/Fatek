import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'
import { MessageProvider } from './context/MessageContext.tsx'
import { TokenProvider } from './context/TokenProvider.tsx'

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
  }
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
