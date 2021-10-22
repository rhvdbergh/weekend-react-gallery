function GalleryItem({ galleryItems }) {
  return (
    <div>
      <div>
        <img src={`${galleryItems[0].path}`} alt="" />
      </div>
      <button>Love it!</button>
      <p>No people love this.</p>
    </div>
  );
}

export default GalleryItem;
