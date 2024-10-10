import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> {/* Wrap the entire app */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
