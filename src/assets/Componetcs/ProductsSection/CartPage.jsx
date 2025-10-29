import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./CartPage.css";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. </p>
        
    
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.Productsname} />
              <div className="cart-info">
                <h4>{item.Productsname}</h4>
                <p>₹{item.price}</p>
                <p>Qty: {item.qty}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total.toLocaleString("en-IN")}</h3>
        </>
      )}
    </div>
  );
}

export default CartPage;