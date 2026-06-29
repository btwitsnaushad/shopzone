import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // <-- Naya Toast Import

export default function Checkout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout par token hata denge aur wapas home par bhej denge
    localStorage.removeItem('auth_token');
    
    // Purane alert ki jagah ab smooth toast aayega
    toast.success('Logged out successfully!'); 
    
    navigate('/');
  };

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'white' }}>
      <h1 style={{ color: '#4ade80' }}>Secure Checkout Page</h1>
      <p style={{ fontSize: '18px', color: '#ccc' }}>Aap successfully ek protected route par aa gaye hain!</p>
      
      <button 
        onClick={handleLogout}
        style={{ 
          padding: '10px 30px', 
          marginTop: '30px', 
          backgroundColor: '#ef4444', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer' 
        }}
      >
        Logout
      </button>
    </div>
  );
}