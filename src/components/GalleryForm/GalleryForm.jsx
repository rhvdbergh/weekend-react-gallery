import axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

function GalleryForm({ fetchGalleryItems }) {
  // set up state to catch input from user
  const [pathInput, setPathInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const addPhoto = (event) => {
    event.preventDefault();
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
        {/* <label htmlFor="photoPath">Path to photo</label> */}
        <TextField
          variant="outlined"
          label="Path to photo..."
          value={pathInput}
          id="photoPath"
          placeholder="http://path_to_pic..."
          onChange={() => {
            setPathInput(event.target.value);
          }}
        />
        <TextField
          variant="outlined"
          label="Description"
          value={descriptionInput}
          id="photoDescription"
          placeholder="That time when..."
          onChange={() => {
            setDescriptionInput(event.target.value);
          }}
        />
        <Button
          id="addPhotoButton"
          variant="contained"
          color="success"
          onClick={addPhoto}
        >
          Add Photo
        </Button>
      </form>
    </div>
  );
}

export default GalleryForm;
