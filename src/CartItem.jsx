import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ TOTAL CART AMOUNT
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      const price = Number(item.cost) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
    return total.toFixed(2);
  };

  // ✅ CONTINUE SHOPPING
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // ✅ CHECKOUT
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // ✅ INCREMENT
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      amount: item.quantity + 1   // ✅ FIXED
    }));
  };

  // ✅ DECREMENT
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        amount: item.quantity - 1   // ✅ FIXED
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ REMOVE
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ ITEM TOTAL
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ₹{calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <h3>No items in cart</h3>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.name}>
            
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>

              <div className="cart-item-cost">
                Price: ₹{item.cost}
              </div>

              {/* QUANTITY */}
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="cart-item-total">
                Total: ₹{calculateTotalCost(item)}
              </div>

              {/* DELETE */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* BUTTONS */}
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;