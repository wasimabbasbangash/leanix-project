import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useToken } from '../hooks/useTokenContext';

// Create an HTTP link to the GitHub GraphQL API
const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

// Set up the authentication link to include the token in the headers
const authLink = setContext((_, { headers }) => {
  const { token } = useToken(); // Get the token from the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Add the token to the authorization header if it exists
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate the auth link and the HTTP link
  cache: new InMemoryCache(), // Set up the in-memory cache
});

export default client;
