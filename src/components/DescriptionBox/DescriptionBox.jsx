import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

function DescriptionBox({
  updateUploadedPhotoDescription,
  photoPath,
  photoIndex,
  photoDescription,
}) {
  // holds a description of this specific image, being set as the user types
  const [description, setDescription] = useState('');

  // if the description changes for this specific image, update the description in GalleryForm
  // do this each time the description changes (it's safer that way - the user can close the modal
  // at any time)
  useEffect(() => {
    updateUploadedPhotoDescription(photoIndex, description);
  }, [description]);

  return (
    <div className="descriptionBox">
      <div className="imageContainer descriptionImageContainer">
        <img className="galleryPic" src={photoPath} alt="" />
      </div>
      <div className="space">
        {/* This has to take an id, or the styling doesn't seem to work */}
        <TextField
          variant="outlined"
          multiline
          maxRows={6}
          label="Description"
          value={description}
          id="photoDescription"
          placeholder="That time when..."
          onChange={() => {
            setDescription(event.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default DescriptionBox;
