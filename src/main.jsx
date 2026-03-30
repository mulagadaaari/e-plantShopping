import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';   // ✅ default import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>   {/* ✅ GLOBAL STORE */}
      <App />
    </Provider>
  </React.StrictMode>
);