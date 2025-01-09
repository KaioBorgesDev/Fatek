import { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo para as mensagens
interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

// Criando o contexto com valores padrão
const MessageContext = createContext<TokenContextProps | undefined>(undefined);

// Componente Provider que fornece o contexto para os filhos
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>('');

  return (
    <MessageContext.Provider value={{ token, setToken }}>
      {children}
    </MessageContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useMessage = (): TokenContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a TokenProvider');
  }
  return context;
};
