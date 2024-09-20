import { useState } from "react";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { FaShoppingCart, FaHistory } from "react-icons/fa";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const generateOrderId = () => `#${Math.floor(Math.random() * 1000000)}`;

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert("สินค้าหมดสต็อก");
      }
    } else {
      if (product.stock > 0) {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      } else {
        alert("สินค้าหมดสต็อก");
      }
    }
  };

  const removeFromCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const addFromCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct.quantity < product.stock) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      alert("สินค้าหมดสต็อก");
    }
  };

  const placeOrder = () => {
    const updatedProducts = cartItems.map((item) => {
      return { ...item, stock: item.stock - item.quantity };
    });

    const orderId = generateOrderId();
    setOrderHistory([...orderHistory, { id: orderId, items: cartItems }]);

    setCartItems([]);
    alert(`Order ${orderId} placed successfully!`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">CSMJU - SHOP</h1>

      <div className="fixed top-0 right-0 mt-1 mx-2 space-x-6 shadow-xl p-3 flex justify-center items-center bg-blue-500 rounded-full z-50">
        <button
          onClick={() => setIsHistoryVisible(!isHistoryVisible)}
          className="relative"
        >
          <FaHistory className="text-3xl text-white" />

          {orderHistory.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
              {orderHistory.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartVisible(!isCartVisible)}
          className="relative"
        >
          <FaShoppingCart className="text-3xl text-white" />

          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
              {cartItems.length}
            </span>
          )}
        </button>

        {isCartVisible && (
          <div className="absolute top-16 right-0 w-80 bg-white shadow-lg p-4 border">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              addFromCart={addFromCart}
            />
            {cartItems.length > 0 && (
              <button
                onClick={placeOrder}
                className="bg-green-500 text-white px-4 py-2 mt-4"
              >
                Place Order
              </button>
            )}
          </div>
        )}

        {isHistoryVisible && (
          <div className="absolute top-16 right-0 w-80 bg-white shadow-lg p-4 border">
            <h2 className="text-lg font-bold">Order History</h2>
            {orderHistory.length > 0 ? (
              <ul>
                {orderHistory.map((order) => (
                  <li
                    key={order.id}
                    className="mt-2 border p-4 border-gray-400"
                  >
                    <span className="font-bold">{order.id}</span>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders yet</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductList addToCart={addToCart} />
      </div>
    </div>
  );
};

export default App;
