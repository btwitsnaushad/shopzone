import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Local storage se token check kar rahe hain
  const token = localStorage.getItem('auth_token');

  // Agar token nahi mila, toh user ko seedha login page par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token mil gaya, toh jo page maanga hai wo dikha do (jaise Checkout)
  return children;
}