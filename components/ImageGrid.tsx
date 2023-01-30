import React from 'react';

interface Image {
  url: string;
  alt: string;
}

interface ImageGridProps {
  images: Image[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="h-screen grid grid-cols-5 gap-4">
      {images.map((image, i) => (
        <img
          key={i}
          src={image.url}
          className="h-64 object-cover"
          alt={image.alt}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
