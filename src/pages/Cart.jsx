import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext'; // Import this

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useContext(CartContext);
  const { isDarkMode } = useContext(ThemeContext); // Use theme state

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Dynamic Styles based on theme
  const containerStyle = {
    padding: '40px 20px',
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#333333', // Text color fixed here!
    minHeight: '100vh',
    transition: '0.3s'
  };

  return (
    <div className="cart-page" style={containerStyle}>
      <div className="cart-header">
        <h1 style={{ color: isDarkMode ? 'white' : 'black' }}>Your Shopping Cart</h1>
        <Link to="/shop" className="continue-shop">← Continue Shopping</Link>
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty!</p>
          <Link to="/shop"><button className="btn-purple">Go back to Shop</button></Link>
        </div>
      ) : (
        <div className="cart-container">
          {/* Table Header */}
          <div className="cart-table-header" style={{ borderBottom: `2px solid ${isDarkMode ? '#333' : '#ddd'}` }}>
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Action</span>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cart-item-row" style={{ borderBottom: `1px solid ${isDarkMode ? '#222' : '#eee'}` }}>
              <div className="item-info">
                <img src={item.thumbnail} alt={item.title} />
                <h3 className="item-title">{item.title}</h3>
              </div>
              <p className="item-category">{item.category || 'General'}</p>
              <p className="item-price">${item.price}</p>
              
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => decreaseQty(item.id)}>➖</button>
                <span className="qty-val">{item.quantity}</span>
                <button className="qty-btn" onClick={() => increaseQty(item.id)}>➕</button>
              </div>

              <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
              
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                🗑 Remove
              </button>
            </div>
          ))}

          <div className="cart-summary" style={{ backgroundColor: isDarkMode ? '#1e1e1e' : '#f4f4f4' }}>
            <h2 style={{ color: isDarkMode ? 'white' : 'black' }}>Total: <span>${totalPrice.toFixed(2)}</span></h2>
            <div className="cart-actions">
              <button className="btn-secondary" onClick={clearCart}>Clear Cart</button>
              <Link to="/checkout">
                <button className="btn-purple">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}