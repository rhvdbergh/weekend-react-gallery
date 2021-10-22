import { useState } from 'react';

function GalleryItem({ galleryItem, addLike }) {
  // tests whether the image or the description is being displayed
  const [flippedImage, setFlippedImage] = useState(false);

  const flipImage = () => {
    // toggle the flipped image boolean
    setFlippedImage(!flippedImage);
  };
  return (
    <div className="galleryItem">
      <div onClick={flipImage} className="imageContainer">
        {flippedImage ? (
          <p>{galleryItem.description}</p>
        ) : (
          <img src={galleryItem.path} alt={galleryItem.description} />
        )}
      </div>
      <button onClick={() => addLike(item)}>Love it!</button>
      <p>
        {galleryItem.likes === 0
          ? `No people love this ... yet.`
          : `${galleryItem.likes} people love this.`}
      </p>
    </div>
  );
}

export default GalleryItem;
