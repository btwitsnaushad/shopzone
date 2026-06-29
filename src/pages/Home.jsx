import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // Validation error state
  const [subscribed, setSubscribed] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=4')
      .then(res => res.json())
      .then(data => setFeatured(data.products));
  }, []);

  // Newsletter Validation Logic
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email!');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true); 
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Smooth Scroll Logic
  const scrollToProducts = () => {
    document.getElementById('featured-products').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Elevate Your Lifestyle with ShopZone</h1>
          <p className="hero-subtitle">Premium quality products, delivered fast. Shop the latest trends now.</p>
          <div className="spacer" style={{ marginBottom: '35px' }}></div>
          {/* Scroll Action Button */}
          <button className="btn-purple hero-btn" onClick={scrollToProducts}>Shop Now</button>
        </div>
        <div className="hero-image">
           <img src="https://img.freepik.com/free-vector/shopping-app-concept-illustration_114360-8473.jpg" alt="Shopping" />
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop By Category</h2>
        <div className="category-grid">
          {[
            { name: 'Beauty', icon: '💄', count: '12' },
            { name: 'Furniture', icon: '🪑', count: '8' },
            { name: 'Groceries', icon: '🍎', count: '24' },
            { name: 'Fragrances', icon: '✨', count: '5' }
          ].map((cat) => (
            <Link to="/shop" key={cat.name} style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="category-card">
                <span className="cat-icon">{cat.icon}</span>
                <h3>{cat.name}</h3>
                <p className="cat-count">{cat.count} Products</p>
                <span className="cat-link">View All →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Added ID for Smooth Scroll */}
      <section id="featured-products" className="featured-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featured.map(product => (
            <div key={product.id} className="product-card">
              <span className="discount-badge">20% OFF</span>
              <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>
              
              <div className="img-container">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              
              <div className="product-info">
                <h4>{product.title}</h4>
                <p className="rating">⭐⭐⭐⭐☆</p>
                <p className="price">${product.price}</p>
                <button className="btn-purple full-width-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="why-choose-us" style={{ paddingBottom: '10px' }}>
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item"><span className="feature-icon">🚚</span><h4>Fast Delivery</h4><p>Free shipping over $50</p></div>
          <div className="feature-item"><span className="feature-icon">🛡️</span><h4>Secure Payment</h4><p>100% Safe Checkout</p></div>
          <div className="feature-item"><span className="feature-icon">🎧</span><h4>24/7 Support</h4><p>Always Here To Help</p></div>
        </div>
      </section>

      <section className="newsletter-section" style={{ paddingTop: '20px' }}>
        <h2>Stay Updated</h2>
        <p>Subscribe for exclusive offers and discounts.</p>
        {!subscribed ? (
          <>
            <form onSubmit={handleSubscribe} className="news-input">
               <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="📧 Enter your email" />
               <button type="submit" className="btn-purple btn-large">Subscribe</button>
            </form>
            {error && <p className="error-text" style={{color: 'red', marginTop: '10px'}}>{error}</p>}
          </>
        ) : (
          <div className="success-toast">✔ Subscribed Successfully!</div>
        )}
      </section>
    </div>
  );
}