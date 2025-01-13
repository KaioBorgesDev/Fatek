import { useEffect } from 'react';
import SectionProduct from '../components/SectionProduct/SectionProduct';
import Slider from '../components/Slider/Slider';
import { useMessage } from '../context/MessageContext';
import { toast, ToastContainer } from 'react-toastify';
import { useToken } from '../context/TokenProvider';

const Home = () => {
  const { message, setMessage } = useMessage();
  const {token} = useToken();
  useEffect(() => {
    if (message != '') {
      toast.success(message);
      setMessage('')
    }
  }, [])

  return (
    <>
      <SectionProduct/>
      <Slider/>
      <ToastContainer position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />

    </>
    
  )
}

export default Home