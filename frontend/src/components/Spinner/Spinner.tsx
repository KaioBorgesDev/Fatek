import "./Spinner.css"; 

const LoadingButton = ({ isLoading}: { isLoading: boolean;}) => {
  return (
    <button className="loading-btn" disabled={isLoading} type="submit">
      {isLoading ? <div className="spinner" /> : "Enviar"}
    </button>
  );
};

export default LoadingButton;