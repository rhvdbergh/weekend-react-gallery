import GalleryItem from '../GalleryItem/GalleryItem';

function GalleryList({ galleryItems }) {
  return (
    <div className="galleryContainer">
      <GalleryItem galleryItems={galleryItems} />
    </div>
  );
}

export default GalleryList;
