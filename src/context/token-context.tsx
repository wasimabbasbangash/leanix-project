import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';

export interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextProps | undefined>(
  undefined
);

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

  const contextValue = useMemo(() => ({ token, setToken }), [token, setToken]);

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};
