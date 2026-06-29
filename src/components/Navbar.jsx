import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext'; 

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation(); // Current path check karne ke liye

  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Active link style function
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#a855f7' : 'white',
    textDecoration: 'none',
    borderBottom: location.pathname === path ? '2px solid #a855f7' : 'none',
    paddingBottom: '5px',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    transition: '0.3s'
  });

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '15px 30px', backgroundColor: isDarkMode ? '#1a1a1a' : '#007bff',
      color: 'white', marginBottom: '20px', borderBottom: isDarkMode ? '1px solid #333' : 'none'
    }}>
      
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>
          SHOPZONE
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={getLinkStyle('/')}>Home</Link>
        <Link to="/shop" style={getLinkStyle('/shop')}>Shop</Link>
        <Link to="/contact" style={getLinkStyle('/contact')}>Contact</Link>
        
        <Link to="/cart" style={getLinkStyle('/cart')} className="cart-nav-link">
          🛒 Cart <span className="cart-badge">{totalItems}</span>
        </Link>

        <div onClick={toggleTheme} className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} style={{ cursor: 'pointer', fontSize: '20px' }}>
          {isDarkMode ? '🌙' : '☀️'}
        </div>
      </div>
    </nav>
  );
}