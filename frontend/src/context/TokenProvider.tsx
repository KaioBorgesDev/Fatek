import { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo para as mensagens
interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

// Criando o contexto com valores padrão
const TokenContext = createContext<TokenContextProps | undefined>(undefined);

// Componente Provider que fornece o contexto para os filhos
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>('');

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
    throw new Error('use Token must be used within a TokenProvider');
  }
  return context;
};
