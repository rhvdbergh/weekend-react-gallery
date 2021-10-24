import { TextField } from '@mui/material';

function DescriptionBox({
  updateUploadedPhotoDescription,
  photoPath,
  photoIndex,
  photoDescription,
}) {
  return (
    <div className="descriptionBox">
      <img className="descriptionImage" src={photoPath} alt="" />
      <div className="space">
        <TextField
          variant="outlined"
          multiline
          maxRows={6}
          label="Description"
          value={photoDescription}
          id="photoDescription"
          placeholder="That time when..."
          onChange={() => {
            updateUploadedPhotoDescription(photoIndex, event.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default DescriptionBox;
