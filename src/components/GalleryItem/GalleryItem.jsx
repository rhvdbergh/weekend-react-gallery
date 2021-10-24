import axios from 'axios';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function GalleryItem({
  galleryItem,
  fetchGalleryItems,
  setPicModalOpen,
  setCurrentFocusPic,
}) {
  // tests whether the image or the description is being displayed
  const [flippedImage, setFlippedImage] = useState(false);

  const flipImage = () => {
    // toggle the flipped image boolean
    setFlippedImage(!flippedImage);
  };

  // will do a PUT to update the number of likes
  const addLike = () => {
    axios
      .put(`gallery/like/${galleryItem.id}`)
      .then((response) => {
        fetchGalleryItems();
      })
      .catch((err) => {
        console.log(`There was an error updating the data on the server:`, err);
      });
  };

  const deleteGalleryItem = () => {
    axios
      .delete(`/gallery/${galleryItem.id}`)
      .then((response) => {
        // refresh the DOM
        fetchGalleryItems();
      })
      .catch((err) => {
        console.log(`There was an error deleting the data on the server:`, err);
      });
  };

  const openImage = () => {
    setCurrentFocusPic(galleryItem);
    setPicModalOpen(true);
  };

  return (
    <Card className="galleryItem">
      <div className="imageContainer" onClick={flipImage}>
        {flippedImage ? (
          <p className="imageDescription">{galleryItem.description}</p>
        ) : (
          <CardMedia
            component="img"
            height="220px"
            image={galleryItem.path}
            alt={galleryItem.description}
            className="galleryPic"
          />
        )}
      </div>
      <CardContent className="cardContent">
        <Typography variant="body2" color="secondary">
          {galleryItem.likes === 0
            ? `No people love this ... yet.`
            : `${galleryItem.likes} ${
                galleryItem.likes === 1 ? 'person loves' : 'people love'
              } this.`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="buttonsContainer">
        <IconButton aria-label="like" onClick={() => addLike(galleryItem)}>
          <FavoriteIcon color="primary" />
        </IconButton>
        <IconButton aria-label="info" onClick={flipImage}>
          <InfoIcon color="info" />
        </IconButton>
        <IconButton aria-label="info" onClick={openImage}>
          <OpenInFullIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="delete" onClick={deleteGalleryItem}>
          <DeleteIcon color="warning" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default GalleryItem;
