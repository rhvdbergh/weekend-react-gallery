function GalleryItem({ galleryItems }) {
  return (
    <div>
      <img src={`${galleryItems[0].path}`} alt="" />
    </div>
  );
}

export default GalleryItem;
