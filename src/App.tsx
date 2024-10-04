import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ResetMap from './components/ResetMap';
// import EurasiaMap from './components/Eurasia/EurasiaMap';
// import NorthAmericaMap from './components/NorthAmerica/NorthAmericaMap';
// import SouthAmericaMap from './components/SouthAmerica/SouthAmericaMap';
// import SouthAfricaMap from './components/SouthAfrica/SouthAfricaMap';
// import AustraliaMap from './components/Australia/AustraliaMap';
import TopMap from './components/TopMap';

function App() {
  return (
    <Router> {/* Routerを外側に移動 */}
      <div className="appContainer">
        <div className="mapContent">
          <Routes>
            <Route path="/" element={<><Header/><TopMap/></>} />
            <Route path="/eurasia" element={<ResetMap continent="Eurasia" />} />
            <Route path="/northamerica" element={<ResetMap continent="NorthAmerica" />} />
            <Route path="/southamerica" element={<ResetMap continent="SouthAmerica" />} />
            <Route path="/southafrica" element={<ResetMap continent="SouthAfrica" />} />
            <Route path="/australia" element={<ResetMap continent="Australia" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
