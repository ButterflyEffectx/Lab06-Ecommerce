import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Cart = ({ cartItems, removeFromCart, addFromCart }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (coupon === "CSMJU") {
      setDiscount(total * 0.2);
    } else {
      setDiscount(0);
    }
  }, [coupon, total]);

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" p-4 border">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      <div className="max-h-60 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b p-2 flex flex-col justify-between items-center"
                >
                  <p>{item.name} </p>
                  <div className="flex justify-between items-center w-5/6 pt-2">
                    <button
                      onClick={() => addFromCart(item)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      +
                    </button>

                    <div className="">
                      <p>
                        (x{item.quantity}) - ${item.price * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addFromCart: PropTypes.func.isRequired,
};

export default Cart;
