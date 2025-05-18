import { useParams } from 'react-router-dom';
import BuyBook from '../components/BuyBook/BuyBook';

const BuyBookRoute = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <BuyBook bookId={id} />
    </>
  );
};

export default BuyBookRoute;
