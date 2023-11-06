import React, { useState } from 'react';
import './ImageGallery.css';

const sampleImages = [
  '/images/image-1.webp',
  '/images/image-2.webp',
  '/images/image-3.webp',
  '/images/image-4.webp',
  '/images/image-5.webp',
  '/images/image-6.webp',
  '/images/image-7.webp',
  '/images/image-8.webp',
  '/images/image-9.webp',
  '/images/image-10.jpeg',
  '/images/image-11.jpeg',
];

const ImageGallery = () => {
  const [imageOrder, setImageOrder] = useState(sampleImages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const startIndex = e.dataTransfer.getData('index');
    const newOrder = [...imageOrder];
    const [draggedImage] = newOrder.splice(startIndex, 1);
    newOrder.splice(index, 0, draggedImage);
    setImageOrder(newOrder);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const toggleImageSelection = (index) => {
    const selectedIndex = selectedImages.indexOf(index);
    const updatedSelection = selectedIndex !== -1
      ? selectedImages.filter((i) => i !== index)
      : [...selectedImages, index];

    setSelectedImages(updatedSelection);
    setSelectedImageCount(updatedSelection.length);
  };

  const deleteSelectedImages = () => {
    const remainingImages = imageOrder.filter((_, index) => !selectedImages.includes(index));
    setImageOrder(remainingImages);
    setSelectedImages([]);
    setSelectedImageCount(0);
  };

  return (
    <div className="gallery-card">
      <div className="gallery-title">
        <h1>Responsive Image Gallery</h1>
        {selectedImages.length > 0 && (
          <button onClick={deleteSelectedImages} className="delete-button">
            Delete
          </button>
        )}
        <div
          className="selected-image-count"
          style={{ display: selectedImages.length > 0 ? 'block' : 'none' }}
        >
          {selectedImageCount} selected
        </div>
      </div>
      <div className="image-gallery">
        {imageOrder.map((image, index) => (
          <div
            key={index}
            className={`image ${selectedImages.includes(index) ? 'selected' : ''}`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => toggleImageSelection(index)}
          >
            <img src={process.env.PUBLIC_URL + image} alt={`Nature Scene ${index + 1}`} />
            <input
              type="checkbox"
              checked={selectedImages.includes(index)}
              readOnly
              className="image-checkbox"
            />
          </div>
        ))}
        {/* 12th grid for "Add Photo" with text centered and hover effect */}
        <div className="image add-photo" onClick={() => { /* Handle adding a photo action */ }}>
          <div className="add-photo-text">Add Photo</div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
