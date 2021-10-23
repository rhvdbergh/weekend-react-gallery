import axios from 'axios';
import { useState } from 'react';

function GalleryItem({ galleryItem, fetchGalleryItems }) {
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

  return (
    <div className="galleryItem">
      <div onClick={flipImage} className="imageContainer">
        {flippedImage ? (
          <p>{galleryItem.description}</p>
        ) : (
          <img
            src={galleryItem.path}
            alt={galleryItem.description}
            className="galleryPic"
          />
        )}
      </div>
      <button onClick={() => addLike(galleryItem)}>Love it!</button>
      <p>
        {galleryItem.likes === 0
          ? `No people love this ... yet.`
          : `${galleryItem.likes} people love this.`}
      </p>
      <button onClick={deleteGalleryItem}>Remove Photo</button>
    </div>
  );
}

export default GalleryItem;
