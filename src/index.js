import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './fonts/stylesheet.css'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { BrowserRouter } from "react-router-dom";
import './utils/i18next';
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
  <Suspense fallback>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
