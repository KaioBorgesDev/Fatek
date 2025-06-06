import { createContext, useContext, useState, ReactNode } from "react";

// Definindo o tipo para as mensagens
interface MessageContextType {
  message: string;
  setMessage: (message: string) => void;
}

// Criando o contexto com valores padrão
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Componente Provider que fornece o contexto para os filhos
export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string>("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
