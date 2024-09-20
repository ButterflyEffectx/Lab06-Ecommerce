import { useState } from 'react';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { FaShoppingCart } from 'react-icons/fa';
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);


  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      
      if (existingProduct.quantity < product.stock) {
        setCartItems(cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        alert('สินค้าหมดสต็อก');
      }
    } else {
      
      if (product.stock > 0) {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      } else {
        alert('สินค้าหมดสต็อก');
      }
    }
  };

  const removeFromCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct.quantity === 1) {
      
      setCartItems(cartItems.filter(item => item.id !== product.id));
    } else {
      
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const addFromCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct.quantity < product.stock) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      alert('สินค้าหมดสต็อก');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">CSMJU - SHOP</h1>

      
      <div className="absolute top-0 right-0 m-4">
        <button onClick={() => setIsCartVisible(!isCartVisible)} className="relative">
          <FaShoppingCart className="text-3xl" />
          
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      
      {isCartVisible && (
        <div className="absolute top-16 right-0 w-80 bg-white shadow-lg p-4 border">
          <Cart cartItems={cartItems} removeFromCart={removeFromCart} addFromCart={addFromCart} />
        </div>
      )}


      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductList addToCart={addToCart} />
      </div>
    </div>
  );
};

export default App;
