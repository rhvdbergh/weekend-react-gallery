import GalleryItem from '../GalleryItem/GalleryItem';

function GalleryList({ galleryItems, addLike }) {
  return (
    <div className="galleryContainer">
      {galleryItems.map((galleryItem) => (
        <GalleryItem
          key={galleryItem.id}
          galleryItem={galleryItem}
          addLike={addLike}
        />
      ))}
    </div>
  );
}

export default GalleryList;
