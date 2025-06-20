import { ToastContainer } from "react-toastify";

const WishList = () => {

    return (
        <>
            <h4>Informações</h4>


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
        </>

    );
};

export default WishList;
