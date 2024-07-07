// token-context.tsx
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string>('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use the TokenContext
export const useToken = (): TokenContextProps => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
