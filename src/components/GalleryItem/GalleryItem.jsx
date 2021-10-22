import { useState } from 'react';

function GalleryItem({ galleryItem }) {
  const [flippedImage, setFlippedImage] = useState('false');
  const [numLikes, setNumLikes] = useState(0);

  const flipImage = () => {
    // toggle the flipped image boolean
    setFlippedImage(!flippedImage);
  };
  return (
    <div className="galleryItem">
      <div onClick={flipImage} className="imageContainer">
        {flippedImage ? (
          <img src={`${galleryItem.path}`} alt={`${galleryItem.description}`} />
        ) : (
          <p>{galleryItem.description}</p>
        )}
      </div>
      <button onClick={() => setNumLikes(numLikes + 1)}>Love it!</button>
      <p>
        {numLikes === 0
          ? `No people love this ... yet.`
          : `${numLikes} people love this.`}
      </p>
    </div>
  );
}

export default GalleryItem;
