import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CartProvider from './store/CartProvider';
import AuthProvider from './store/AuthProvider';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
