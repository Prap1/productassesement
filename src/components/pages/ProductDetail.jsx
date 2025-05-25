import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../common/Loader';
import { fetchProductById, clearSelectedProduct } from '../redux/productSlice';
import '../styles/ProductDetail.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchProductById(id))} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error">
        <p>Product not found</p>
        <Link to="/" className="back-button">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="product-detail">
      <Link to="/" className="back-button">← Back to Products</Link>
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p className="category">Category: {product.category}</p>
           <div className="description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
          <div className="rating">
            <div className="stars">
              {renderStars(product.rating?.rate || 0)}
            </div>
            <span className="rating-count">({product.rating?.count || 0} reviews)</span>
          </div>
         
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ProductDetail;
