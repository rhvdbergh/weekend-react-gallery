function GalleryItem({ galleryItems }) {
  const images = galleryItems.map((item) => {
    return (
      <>
        <div>
          <img src={`${galleryItems[0].path}`} alt="" />
        </div>
        <button>Love it!</button>
        <p>No people love this.</p>
      </>
    );
  });

  return <div>{galleryItems.length && images}</div>;
}

export default GalleryItem;
