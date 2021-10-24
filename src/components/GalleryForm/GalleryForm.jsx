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
import DescriptionBox from '../DescriptionBox/DescriptionBox';

let tempUploadedPhotos = [];
let tempDescriptions = {};

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
        const paths = result.successful.map(
          (res) => `/gallery/images/${res.name}`
        );

        // clear the uploadedPhotos to ensure only newly uploaded files are in
        // the descriptionModalBox
        setUploadedPhotos([]);
        tempUploadedPhotos = [];

        // add these photos to the database, albeit without description
        for (let path of paths) {
          const newPhoto = {
            path: path,
            description: '',
          };
          postPhoto(newPhoto);
        }
        setUploadedPhotos(tempUploadedPhotos);
        setDescriptionModalOpen(true);
      });
  });
  // set up state to catch input from user
  const [pathInput, setPathInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [updatedDescriptions, setUpdatedDescriptions] = useState({});

  // TODO: feed the rigth info here
  const updateUploadedPhotoDescription = (photoIndex, description) => {
    tempDescriptions = { ...updatedDescriptions };
    tempDescriptions[photoIndex] = description;
    setUpdatedDescriptions({ ...tempDescriptions });
  };

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
        // add this id, path, and description so we can access it later
        tempUploadedPhotos.push(response.data.uploadedPhoto);
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

  const updateDescriptionsOnServer = () => {
    console.log(`about to update those descriptions`);
    for (let photo of uploadedPhotos) {
      axios
        .put(`/gallery/description/${photo.id}`, {
          description: updatedDescriptions[photo.id],
        })
        .then((response) => {})
        .catch((err) => {
          console.log(`There was an error posting data to the server:`, err);
        });
    } // end for
    // clear everything that has to do with keeping track
    // of the newly uploaded photos
    tempUploadedPhotos = {};
    tempDescriptions = [];
    setUpdatedDescriptions([]);
    setUploadedPhotos([]);
    // refresh the DOM
    fetchGalleryItems();
  };

  console.log(`at this point, descriptions are`, updatedDescriptions);

  return (
    <div id="galleryForm">
      <form id="addPhotoForm">
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
        <div className="buttons">
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
        </div>
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
          updateDescriptionsOnServer();
          setDescriptionModalOpen(false);
        }}
      >
        <h2>Please add photo description(s) to the uploaded photo(s).</h2>
        <form id="descriptionBoxContainer">
          <div id="descriptionBoxContainer">
            {uploadedPhotos.map((photo) => {
              return (
                <DescriptionBox
                  key={photo.id}
                  photoPath={photo.path}
                  updateUploadedPhotoDescription={
                    updateUploadedPhotoDescription
                  }
                  photoIndex={photo.id}
                  photoDescription={updatedDescriptions[photo.id]}
                />
              );
            })}
          </div>
          <div id="descriptionBoxButtonContainer">
            <Button
              id="descriptionModalButton"
              variant="contained"
              color="success"
              onClick={() => {
                updateDescriptionsOnServer();
                setDescriptionModalOpen(false);
              }}
            >
              Update Descriptions
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default GalleryForm;
