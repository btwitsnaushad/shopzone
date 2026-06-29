import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Hamara naya import yahan hai
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    {/* Wi-Fi Router chalu ho gaya */}
    <CartProvider>
      
      {/* Ab is App ke andar jitne bhi pages hain, sabko Cart ka data mil jayega */}
      <App />
      
    </CartProvider>
    
  </React.StrictMode>,
)