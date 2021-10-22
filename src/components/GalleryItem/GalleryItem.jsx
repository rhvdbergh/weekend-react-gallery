function GalleryItem({ galleryItem }) {
  return (
    <div className="galleryItem">
      <div>
        <img src={`${galleryItem.path}`} alt="" />
      </div>
      <button>Love it!</button>
      <p>No people love this.</p>
    </div>
  );
}

export default GalleryItem;
