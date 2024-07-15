import React, { createContext, ReactNode, useMemo, useState } from 'react';

// Define the properties for the TokenContext
export interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

// Create the TokenContext with undefined as the default value
export const TokenContext = createContext<TokenContextProps | undefined>(
  undefined
);

interface TokenProviderProps {
  children: ReactNode;
}

// TokenProvider component provides the token state and functions to its children
export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  // State to hold the current token
  const [token, setTokenState] = useState<string>('');

  // Function to update the token state and save it to localStorage
  const setToken = (newToken: string) => {
    setTokenState(newToken); // Update the token state
  };

  // useMemo hook to memoize the context value, preventing unnecessary re-renders
  const contextValue = useMemo(() => ({ token, setToken }), [token]);

  return (
    // Provide the token state and setToken function to the children components
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};
