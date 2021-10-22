import { useState } from 'react';

function GalleryItem({ galleryItem }) {
  const [flippedImage, setFlippedImage] = useState('false');

  return (
    <div className="galleryItem">
      <div className="imageContainer">
        {flippedImage ? (
          <img src={`${galleryItem.path}`} alt={`${galleryItem.description}`} />
        ) : (
          <p>{galleryItem.description}</p>
        )}
      </div>
      <button>Love it!</button>
      <p>No people love this.</p>
    </div>
  );
}

export default GalleryItem;
