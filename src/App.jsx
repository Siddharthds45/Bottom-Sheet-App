import React from 'react';
import './App.css';
import BottomSheet from './components/BottomSheet/BottomSheet';

function App() {
  return (
    <div className="App">
      <h1 style={{color:'gold'}}>React Bottom Sheet</h1>
      <p>Drag the handle or use buttons to control the bottom sheet</p>
      
      <BottomSheet>
        <h2 style={{color:'gray'}}>Bottom Sheet Content</h2>
        <p style={{color:'gray'}}>This content can be scrolled when the sheet is open.</p>
        <div style={{ height: '1000px', background: 'linear-gradient(#eee, #fff)' }}>
          <p style={{color:'gray'}}>Scrollable content area</p>
        </div>
      </BottomSheet>
    </div>
  );
}

export default App;