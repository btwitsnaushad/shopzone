import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // <-- Naya Toast Import

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Fake login token set kar rahe hain
    localStorage.setItem('auth_token', 'dummy_token_123');
    
    // Purane alert ki jagah ab stylish toast aayega!
    toast.success('Logged in as Guest!');
    
    // Login hote hi user ko wapas checkout par bhej denge
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'white' }}>
      <h1>Login to Shopzone</h1>
      <button 
        onClick={handleLogin}
        style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', marginTop: '20px' }}
      >
        Login as Guest
      </button>
    </div>
  );
}