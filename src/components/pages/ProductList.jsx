import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';
import { fetchProducts } from '../redux/productSlice';
import '../styles/ProductList.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function ProductList() {
  const dispatch = useDispatch();
  const { items: products, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => dispatch(fetchProducts())} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-list">
        <h1>Products</h1>
        
        {/* Search and Filter Section */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductList;
