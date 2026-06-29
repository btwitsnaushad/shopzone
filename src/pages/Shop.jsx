import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        const fetchedProducts = data.products || data;
        setAllProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      });
  }, []);

  useEffect(() => {
    let result = allProducts;
    if (selectedCategory !== 'All') {
      result = result.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    result = result.filter((product) => product.price <= priceRange);
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, allProducts]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(1000);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h2>All Products</h2>
        <p>Showing {filteredProducts.length} products</p>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <ul>
              {['All', 'Beauty', 'Furniture', 'Groceries', 'Fragrances'].map((category) => (
                <li key={category}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      style={{ marginRight: '10px', accentColor: '#a855f7' }}
                    />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Price Range: Upto ${priceRange}</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="price-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '5px' }}>
              <span>$0</span>
              <span style={{ color: '#a855f7', fontWeight: 'bold' }}>${priceRange}</span>
            </div>
          </div>
          <button className="btn-reset" onClick={resetFilters}>Reset Filters</button>
        </aside>

        <main className="shop-products">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <h3 style={{ color: 'white' }}>No products found.</h3>
              <button className="btn-reset" onClick={resetFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.thumbnail || product.image} alt={product.title} />
                  <h4 title={product.title}>{product.title}</h4>
                  <p className="price">${product.price}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/product/${product.id}`} style={{ flex: '0.5' }}>
                      <button className="btn-secondary" style={{ width: '100%' }}>View</button>
                    </Link>
                    <button className="btn-purple" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}