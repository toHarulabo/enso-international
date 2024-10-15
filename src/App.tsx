import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ResetMap from './components/ResetMap';
import TopMap from './components/TopMap';

function App() {
  const [totalLabelSum, setTotalLabelSum] = useState<number>(0); // 親コンポーネントで管理

  return (
    <Router>
      <div className="appContainer">
        <div className="mapContent">
          <Routes>
            <Route 
              path="/" 
              element={<><Header totalLabelSum={totalLabelSum}/><TopMap/></>} 
            />
            <Route 
              path="/eurasia" 
              element={<ResetMap continent="Eurasia" />} 
            />
            <Route 
              path="/northamerica" 
              element={<ResetMap continent="NorthAmerica" />} 
            />
            <Route 
              path="/southamerica" 
              element={<ResetMap continent="SouthAmerica" />} 
            />
            <Route 
              path="/southafrica" 
              element={<ResetMap continent="SouthAfrica" />} 
            />
            <Route 
              path="/australia" 
              element={<ResetMap continent="Australia" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
