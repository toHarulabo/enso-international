import React from 'react';
import './App.css';
import Header from './components/Header';
import AirportMap from './components/AirportMap';

function App() {
  return (
    <div className="App">
       <Header />
      {/* <header className="App-header">
        <h1>World Airports Map</h1>
      </header> */}
      <AirportMap />
    </div>
  );
}

export default App;
