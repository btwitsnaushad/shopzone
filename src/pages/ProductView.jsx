import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// 1. Apna Context import kar rahe hain
import { CartContext } from '../context/CartContext';

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 2. Context dabe (box) me se 'addToCart' function nikal rahe hain
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: '20px' }}>Loading product details...</h2>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <img src={product.thumbnail} alt={product.title} style={{ width: '100%', borderRadius: '8px' }} />
      <h1>{product.title}</h1>
      <h2 style={{ color: 'green' }}>Price: ${product.price}</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{product.description}</p>
      
      {/* 3. Naya 'Add to Cart' button jo click hone par item ko global state mein bhej dega */}
      <button 
        onClick={() => addToCart(product)}
        style={{ 
          padding: '12px 24px', 
          fontSize: '16px', 
          backgroundColor: '#ff9900', 
          color: 'black', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}