import GalleryItem from '../GalleryItem/GalleryItem';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';

function GalleryList({ galleryItems, fetchGalleryItems }) {
  // set up the state
  // these two state variables will decide whether the larger display modal should be open
  // and which galleryItem photo should be displayed in that modal
  // they are set within the GalleryItem component
  const [picModalOpen, setPicModalOpen] = useState(false);
  const [currentFocusPic, setCurrentFocusPic] = useState({});

  return (
    <>
      {/* Build the gallery items */}
      <div className="galleryContainer">
        {galleryItems.map((galleryItem) => (
          <GalleryItem
            key={galleryItem.id}
            galleryItem={galleryItem}
            fetchGalleryItems={fetchGalleryItems}
            setPicModalOpen={setPicModalOpen}
            setCurrentFocusPic={setCurrentFocusPic}
          />
        ))}
      </div>
      {/* A modal to display a larger image if the user expands the photo */}
      <Modal
        style={{
          overlay: { zIndex: 999 },
          content: {
            height: '650px',
            width: '850px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        isOpen={picModalOpen}
        onRequestClose={() => {
          // resets the modal so it can be used again
          setPicModalOpen(false);
        }}
      >
        <div className="displayModalContainer">
          <img
            className="displayModalImage"
            src={currentFocusPic.path}
            alt={currentFocusPic.description}
          ></img>
        </div>
        {/* adds a description as a caption to the image */}
        <p>{currentFocusPic.description}</p>
      </Modal>
    </>
  );
}

export default GalleryList;
