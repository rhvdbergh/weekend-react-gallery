import axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { DashboardModal, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

function GalleryForm({ fetchGalleryItems }) {
  const uppy = useUppy(() => {
    // set the endpoint - where the files should be uploaded to
    return new Uppy().use(Tus, { endpoint: '/images', resume: true });
  });
  // initialize an uppy instance with the useUppy hook
  // set up state to catch input from user
  const [pathInput, setPathInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

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
        <div className="space">
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
        </div>
        <div className="space">
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
        </div>
        <Button
          id="addPhotoButton"
          variant="contained"
          color="success"
          onClick={addPhoto}
        >
          Add Photo
        </Button>
        <Button
          id="uploadPhotoButton"
          variant="contained"
          color="success"
          onClick={() => {
            setUploadModalOpen(true);
          }}
        >
          Upload Photo
        </Button>
      </form>
      <DashboardModal uppy={uppy} open={uploadModalOpen} />
    </div>
  );
}

export default GalleryForm;
