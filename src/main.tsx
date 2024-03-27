import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { App } from './app';
import './index.css';

import { store } from 'store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer hideProgressBar={true} />
    </React.StrictMode>
  </Provider>,
);
