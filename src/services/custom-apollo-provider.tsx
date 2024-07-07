// CustomApolloProvider.tsx
import React from 'react';
import { ApolloProvider as OriginalApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useToken } from './../context/token-context';

const CustomApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useToken();

  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>;
};

export default CustomApolloProvider;
