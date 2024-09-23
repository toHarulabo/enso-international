import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import EurasiaMap from './components/Eurasia/EurasiaMap';
import NorthAmericaMap from './components/NorthAmerica/NorthAmericaMap';
import TopMap from './components/TopMap';

function App() {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<TopMap />} />
        <Route path="/eurasia" element={<EurasiaMap />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
