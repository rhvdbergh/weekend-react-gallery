import GalleryItem from '../GalleryItem/GalleryItem';

function GalleryList({ galleryItems, fetchGalleryItems }) {
  return (
    <div className="galleryContainer">
      {galleryItems.map((galleryItem) => (
        <GalleryItem
          key={galleryItem.id}
          galleryItem={galleryItem}
          fetchGalleryItems={fetchGalleryItems}
        />
      ))}
    </div>
  );
}

export default GalleryList;
