import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, ThemeContext } from './context/ThemeContext'; // ThemeContext import kiya

// Components & Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import ProductView from './pages/ProductView';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Is naye component mein hum ThemeContext use kar sakte hain
function MainLayout() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    // Ye 'dark-theme' ya 'light-theme' class puri website ke colors control karegi
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh', transition: '0.3s' }}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        
        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

// App main entry point
function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;