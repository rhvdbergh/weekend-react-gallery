import React, { useState, useEffect } from 'react';
import GalleryList from '../GalleryList/GalleryList';
import axios from 'axios';

import './App.css';

function App() {
  let [galleryItems, setGalleryItems] = useState([]);

  // fetch the galleryItems at pageload
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = () => {
    axios
      .get(`/gallery`)
      .then((response) => {
        console.log(`got response.data`, response.data);
        setGalleryItems(response.data);
      })
      .catch((err) => {
        console.log(`There was an error retrieving data form the server:`, err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Gallery of My Life</h1>
      </header>
      <GalleryList galleryItems={galleryItems} />
    </div>
  );
}

export default App;
