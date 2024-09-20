import { useState, useEffect } from "react";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { FaShoppingCart, FaHistory } from "react-icons/fa";

const App = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
    // eslint-disable-next-line no-unused-vars
    const updatedProducts = cartItems.map((item) => {
      return { ...item, stock: item.stock - item.quantity };
    });

    const orderId = generateOrderId();
    setOrderHistory([...orderHistory, { id: orderId, items: cartItems }]);

    setCartItems([]);
    alert(`Order ${orderId} placed successfully!`);
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (coupon === "CSMJU" | coupon === "csmju") {
      setDiscount(total * 0.2);
    } else {
      setDiscount(0);
    }
  }, [coupon, total]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">CSMJU - SHOP</h1>

      <div className="fixed top-0 right-0 mt-1 mx-2 space-x-6 shadow-xl p-3 flex justify-center items-center bg-blue-500 rounded-full z-50">
        <button
          onClick={() => {setIsHistoryVisible(!isHistoryVisible); setIsCartVisible(false);}}
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
          onClick={() => {setIsCartVisible(!isCartVisible); setIsHistoryVisible(false);}}
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
              <>
                <div className="font-bold mt-4">
                  Delivery: 100 / Total: ${total + 100 - discount}
                </div>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    id="Coupon"
                    className="mt-2 border border-gray-200 w-full p-2"
                    placeholder='Enter "CSMJU" Coupon 20% cost'
                    value={coupon}
                    onChange={handleCouponChange}
                  />
                </form>
                {discount > 0 && (
                  <p className="text-green-500">
                    Coupon applied! You saved ${discount.toFixed(2)}.
                  </p>
                )}
                <button
                  onClick={placeOrder}
                  className="bg-green-500 text-white px-4 py-2 mt-4"
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        )}

        {isHistoryVisible && (
          <div className="absolute top-16 right-0 w-80 bg-white shadow-lg p-4 border">
            <h2 className="text-2xl font-bold">Order History</h2>
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
        <ProductList  addToCart={addToCart} />
      </div>
    </div>
  );
};

export default App;
