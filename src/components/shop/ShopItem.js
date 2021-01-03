import React from 'react';

function ShopItem({
  name,
  images,
  colors,
  price,
  dimensions,
  description,
  type,
  additionals,
}) {
  return (
    <div>
      name: {name}
      images: {images[0]}
      colors: {colors.map(color => {
        return (
        <div>{color.description}</div>
        )})}
      price: {price}
      type: {type}
      dimensions: {Object.keys(dimensions).map(key => {
        return (
          <div>{key} - {dimensions[key]}</div>
        )
      })}
      description: {description}
      additionals: {additionals.seats}
    </div>
  );
}

export default ShopItem;
