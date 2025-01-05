import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './routes/Home.tsx'
import Login from './routes/Login.tsx'

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
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login/>,
        
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
