import GalleryItem from '../GalleryItem/GalleryItem';

function GalleryList({ galleryItems }) {
  return (
    <div className="galleryContainer">
      {galleryItems.map((galleryItem) => (
        <GalleryItem key={galleryItem.id} galleryItem={galleryItem} />
      ))}
    </div>
  );
}

export default GalleryList;
