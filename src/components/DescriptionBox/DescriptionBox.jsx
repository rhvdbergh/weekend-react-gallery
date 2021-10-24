import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

function DescriptionBox({
  updateUploadedPhotoDescription,
  photoPath,
  photoIndex,
  photoDescription,
}) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    updateUploadedPhotoDescription(photoIndex, description);
  }, [description]);

  return (
    <div className="descriptionBox">
      <img className="descriptionImage" src={photoPath} alt="" />
      <div className="space">
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