import { useContext } from 'react';

import { TokenContext, TokenContextProps } from '../context/token-context';

// Custom hook to use the TokenContext
export const useToken = (): TokenContextProps => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
