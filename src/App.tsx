import { BrowserRouter as Router, } from 'react-router-dom';
import './App.css';
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
