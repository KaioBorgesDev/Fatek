import { useEffect } from 'react';
import SectionProduct from '../components/SectionProduct/SectionProduct';
import Slider from '../components/Slider/Slider';
import { useMessage } from '../context/MessageContext';
import { toast, ToastContainer } from 'react-toastify';


const Home = () => {
  const { message, setMessage } = useMessage();

  useEffect(() => {
    if (message != '') {
      console.log(message)
      toast.success(message);
      setMessage('')
    }
  }, [])

  return (
    <>
      <SectionProduct/>
      <Slider/>
    </>
    
  )
}

export default Home