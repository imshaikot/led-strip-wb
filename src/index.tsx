import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppContext from './app.context';

const defaultContext = {
  services: {
    uuid: '0000ffd5-0000-1000-8000-00805f9b34fb',
    BTServices: [],
  },
  updateUUID: (uuid: string) => ({
    ...defaultContext,
    services: {
      ...defaultContext.services,
      uuid,
    }
  }),
  setServices: (services: any) => ({
    ...defaultContext,
    services: {
      ...defaultContext.services,
      BTServices: services,
    }
  })
}

ReactDOM.render(
  <AppContext.Provider value={defaultContext}>
    <App />
  </AppContext.Provider>,
  document.getElementById('root')
);
