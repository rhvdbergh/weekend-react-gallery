import React from 'react';
import GalleryList from '../GalleryList/GalleryList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Gallery of My Life</h1>
      </header>
      <GalleryList />
      <img src="images/goat_small.jpg" />
    </div>
  );
}

export default App;
