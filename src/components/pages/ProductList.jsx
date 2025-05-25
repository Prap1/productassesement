import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../common/ProductCard';
import { fetchProducts } from '../redux/productSlice';
import '../styles/ProductList.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

function ProductList() {
  const dispatch = useDispatch();
  const { items: allProducts, error } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories from products
  const categories = ['all', ...new Set(allProducts.map(product => product.category))];

  // Filter products based on search term and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Update displayed products when filters change
  useEffect(() => {
    setPage(1);
    setDisplayedProducts(filteredProducts.slice(0, productsPerPage));
  }, [searchTerm, selectedCategory, filteredProducts]);

  // Load more products when scrolling
  const loadMoreProducts = useCallback(() => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * productsPerPage;
    const newProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (newProducts.length > displayedProducts.length) {
      setDisplayedProducts(newProducts);
      setPage(nextPage);
    }
  }, [page, filteredProducts, displayedProducts.length]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts]);

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
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {displayedProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}

        {displayedProducts.length < filteredProducts.length && (
          <div className="load-more">
            <p>Scroll down to load more products</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductList;
