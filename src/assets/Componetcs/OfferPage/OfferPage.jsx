import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OfferPage() {
  const { state } = useLocation() || {};
  const navigate = useNavigate();

  // Get product from state or localStorage fallback
  const product = state?.product || JSON.parse(localStorage.getItem("lastViewedProduct"));

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No product selected!</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const discountPercent = Math.floor(Math.random() * 20) + 10; // random 10–30% discount
  const discountedPrice = (product.price - (product.price * discountPercent) / 100).toFixed(2);

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>🎉 Exclusive Offer for You!</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "200px", borderRadius: "10px", margin: "20px 0" }}
      />
      <h3>{product.title}</h3>
      <p>Original Price: <s>₹{product.price}</s></p>
      <p style={{ fontSize: "20px", color: "green" }}>
        Discount: {discountPercent}% OFF
      </p>
      <h3 style={{ color: "red" }}>Now Only ₹{discountedPrice}</h3>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => alert("✅ Order placed successfully!")}
      >
        Place Order
      </button>
    </div>
  );
}

export default OfferPage;