function GalleryItem({ galleryItem }) {
  return (
    <div>
      <div>
        <img src={`${galleryItem.path}`} alt="" />
      </div>
      <button>Love it!</button>
      <p>No people love this.</p>
    </div>
  );
}

export default GalleryItem;
