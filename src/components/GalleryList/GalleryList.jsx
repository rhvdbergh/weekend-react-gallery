import GalleryItem from '../GalleryItem/GalleryItem';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';

function GalleryList({ galleryItems, fetchGalleryItems }) {
  const [picModalOpen, setPicModalOpen] = useState(false);
  const [currentFocusPic, setCurrentFocusPic] = useState({});

  return (
    <>
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
      </Modal>
    </>
  );
}

export default GalleryList;
