import axios from 'axios';
import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DashboardModal, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import Modal from 'react-modal';

function GalleryForm({ fetchGalleryItems }) {
  // initialize an uppy instance with the useUppy hook
  const uppy = useUppy(() => {
    // set the endpoint - where the files should be uploaded to
    return new Uppy()
      .use(XHRUpload, {
        method: 'post',
        formData: true,
        endpoint: '/gallery/upload',
      })
      .on(`complete`, (result) => {
        // we're only interested in the photo names,
        // and they live on result.successful in an array of objects,
        // each with .name
        let paths = result.successful.map(
          (res) => `/gallery/images/${res.name}`
        );

        // add these photos to the database, albeit without description
        for (let path of paths) {
          const newPhoto = {
            path: path,
            description: '',
          };
          postPhoto(newPhoto);
          // setDescriptionModalOpen(false);
        }
        setDescriptionModalOpen(true);
      });
  });
  // set up state to catch input from user
  const [pathInput, setPathInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const addPhoto = (event) => {
    event.preventDefault();
    // build a newPhoto object
    const newPhoto = {
      path: pathInput,
      description: descriptionInput,
    };
    postPhoto(newPhoto);
  };

  const postPhoto = (photo) => {
    axios
      .post(`/gallery`, photo)
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
          Upload Photo(s)
        </Button>
      </form>
      <DashboardModal
        uppy={uppy}
        open={uploadModalOpen}
        onRequestClose={() => {
          setUploadModalOpen(false);
        }}
        closeAfterFinish={true}
      />

      <Modal
        isOpen={descriptionModalOpen}
        onRequestClose={() => {
          setDescriptionModalOpen(false);
        }}
      >
        <h2>Please add a description to this photo.</h2>
      </Modal>
    </div>
  );
}

export default GalleryForm;
