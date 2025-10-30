import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OfferPage.css"

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
        <div className="offer-container">
            <h2 className="offer-title">🎉 Exclusive Offer for You!</h2>
            <img src={product.image} alt={product.title} className="offer-image" />
            <h3 className="offer-product-title">{product.title}</h3>
            <p className="offer-price">Original Price: <s>₹{product.price}</s></p>
            <p className="offer-discount">Discount: {discountPercent}% OFF</p>
            <h3 className="offer-final-price">Now Only ₹{discountedPrice}</h3>

            <button
                className="offer-button"
                onClick={() => alert("✅ Order placed successfully!")}
            >
                Place Order
            </button>
        </div>
    );
}

export default OfferPage;