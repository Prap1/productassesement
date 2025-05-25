import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} className="star full">★</span>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" className="star half">★</span>
      );
    }

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">☆</span>
      );
    }

    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <div className="rating">
          <div className="stars">
            {renderStars(product.rating?.rate || 0)}
          </div>
          <span className="rating-count">({product.rating?.count || 0} reviews)</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
