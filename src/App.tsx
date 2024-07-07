import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import { ApolloProvider } from '@apollo/client';
import client from './services/apolloClient';
import AppRoutes from './core/utils/routes';  
import { TokenProvider } from './context/token-context';
import CustomApolloProvider from './services/custom-apollo-provider';

function App() {
  return (
    <TokenProvider>
    <CustomApolloProvider>
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
    </CustomApolloProvider>
    </TokenProvider>
  );
}

export default App;
