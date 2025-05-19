import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
