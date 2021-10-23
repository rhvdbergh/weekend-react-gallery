function GalleryForm({ fetchGalleryItems }) {
  const addPhoto = (event) => {
    event.preventDefault();
    console.log(`About to add a photo!`);
  };

  return (
    <div className="galleryForm">
      <form action="">
        <p>GalleryForm placeholder</p>
        <label htmlFor="photoPath">Path to photo</label>
        <input type="text" id="photoPath" placeholder="http://path_to_pic..." />
        <label htmlFor="photoDescription">Description</label>
        <input
          type="text"
          id="photoDescription"
          placeholder="That time when..."
        />
        <button onClick={addPhoto}>Add Photo</button>
      </form>
    </div>
  );
}

export default GalleryForm;
