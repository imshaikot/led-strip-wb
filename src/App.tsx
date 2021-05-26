import React from 'react';
import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import Scan from './Pages/Scan'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="ble-container">
      <div className="ble-vbox">
        <Scan />
      </div>
    </Container>
  );
}

export default App;
