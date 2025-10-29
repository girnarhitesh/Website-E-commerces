import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { CartContext } from "../ProductsSection/CartContext";

function Navigationsection() {
    const { cart, searchQuery, setSearchQuery } = useContext(CartContext);

    return (
        <header className="main-header">
            <nav className="navbar">
                {/* Logo */}
                <div className="logo-container">
                    <Link to="/">
                        <img
                            src="https://img.freepik.com/premium-vector/ecommerce-logo-gradient-design_561408-2460.jpg?w=2000"
                            alt="E-Commerce Logo"
                            className="logo-img"
                        />
                    </Link>
                </div>

                {/* Navigation Links (Categories) */}
                <ul className="nav-links">
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        id="search-products"
                        name="search-products"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Cart Icon */}
                <div className="nav-icons">
                    <Link to="/cart" className="cart-icon">
                        <FaShoppingCart style={{ fontSize: "30px" }} />
                        <span className="cart-count">{cart.length}</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navigationsection;