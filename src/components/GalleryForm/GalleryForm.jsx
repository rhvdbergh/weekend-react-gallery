import axios from 'axios';
import { useState } from 'react';

function GalleryForm({ fetchGalleryItems }) {
  // set up state to catch input from user
  const [pathInput, setPathInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const addPhoto = (event) => {
    event.preventDefault();
    console.log(`About to add a photo!`);
    // build a newPhoto object
    const newPhoto = {
      path: pathInput,
      description: descriptionInput,
    };

    axios
      .post(`/gallery`, newPhoto)
      .then((response) => {
        // refresh the DOM
        fetchGalleryItems();
        // clear the inputs
        setPathInput('');
        setDescriptionInput('');
      })
      .catch((err) => {
        console.log(`There was an error posting data to the server:`, err);
      });
  };

  return (
    <div className="galleryForm">
      <form action="">
        <p>GalleryForm placeholder</p>
        <label htmlFor="photoPath">Path to photo</label>
        <input
          type="text"
          value={pathInput}
          id="photoPath"
          placeholder="http://path_to_pic..."
          onChange={() => {
            setPathInput(event.target.value);
          }}
        />
        <label htmlFor="photoDescription">Description</label>
        <input
          type="text"
          value={descriptionInput}
          id="photoDescription"
          placeholder="That time when..."
          onChange={() => {
            setDescriptionInput(event.target.value);
          }}
        />
        <button onClick={addPhoto}>Add Photo</button>
      </form>
    </div>
  );
}

export default GalleryForm;
