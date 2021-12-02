import React, { useState, useEffect } from 'react';
// import * as React from 'react';
import GalleryList from '../GalleryList/GalleryList';
import GalleryForm from '../GalleryForm/GalleryForm';
import axios from 'axios';
import './App.css';

// app
function App() {
  let [galleryItems, setGalleryItems] = useState([]);

  // fetch the galleryItems at pageload
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // fetch all the gallery items from the server
  const fetchGalleryItems = () => {
    axios
      .get(`/gallery`)
      .then((response) => {
        // response.data contains the relevant information, objects with GalleryItems
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
      <GalleryForm
        fetchGalleryItems={fetchGalleryItems}
        galleryItems={galleryItems}
      />
      <GalleryList
        galleryItems={galleryItems}
        fetchGalleryItems={fetchGalleryItems}
      />
    </div>
  );
}

export default App;
