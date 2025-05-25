import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductList from './components/pages/ProductList';
import ProductDetail from './components/pages/ProductDetail';
import store from './components/redux/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
