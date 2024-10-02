import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import EurasiaMap from './components/Eurasia/EurasiaMap';
import NorthAmericaMap from './components/NorthAmerica/NorthAmericaMap';
import SouthAmericaMap from './components/SouthAmerica/SouthAmericaMap';
import SouthAfricaMap from './components/SouthAfrica/SouthAfricaMap';
import AustraliaMap from './components/Australia/AustraliaMap';
import TopMap from './components/TopMap';

function App() {
  return (
    <div className="appContainer">
      <Header />
      <div className="mapContent">
        <Router>
          <Routes>
            <Route path="/" element={<TopMap />} />
            <Route path="/eurasia" element={<EurasiaMap />} />
            <Route path="/northamerica" element={<NorthAmericaMap />} />
            <Route path="/southamerica" element={<SouthAmericaMap />} />
            <Route path="/southafrica" element={<SouthAfricaMap />} />
            <Route path="/australia" element={<AustraliaMap />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
