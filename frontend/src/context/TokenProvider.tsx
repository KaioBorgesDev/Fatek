import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

// Definindo o tipo para o contexto
interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa o token a partir dos cookies, se existir
  const [token, setTokenState] = useState<string>(() => Cookies.get("token") || "");

  // Atualiza o cookie sempre que o token for alterado
  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 }); 
    } else {
      Cookies.remove("token"); 
    }
  }, [token]);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useToken = (): TokenContextProps => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
