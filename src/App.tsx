import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import AppContext from './app.context';
import Scan from './Pages/Scan';
import Connected from './Pages/Connected';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultContext = {
  uuid: '0000ffd5-0000-1000-8000-00805f9b34fb',
  cuuid: '0000ffd9-0000-1000-8000-00805f9b34fb',
  connected: false,
  setConnected: null,
  loading: false,
  setLoading: null,
  request: null,
  setRequest: null,
  device: null,
  setDevice: null,
  services: null,
  setServices: null,
  writableCharacteristic: null,
  setWritableCharacteristic: null,
}

function App() {
  const [writableCharacteristic, setWritableCharacteristic] = useState(null);
  const [loading, setLoading] = useState(null);
  const [connected, setConnected] = useState(null);
  const [services, setServices] = useState(null);
  const [device, setDevice] = useState(null);
  const [request, setRequest] = useState(null);

  return (
    <AppContext.Provider value={{
      ...defaultContext,
      connected,
      setConnected,
      loading,
      setLoading,
      writableCharacteristic,
      setWritableCharacteristic,
      services,
      setServices,
      device,
      setDevice,
      request,
      setRequest,
      }}>
      <Container className="ble-container">
        <div className="ble-vbox">
          { !connected ? <Scan /> : <Connected /> }
        </div>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
