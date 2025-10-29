import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Componetcs/ProductsSection/CartContext";
import "./Productspage.css";

function Productspage() {
    const [products, setProducts] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    const { addToCart, searchQuery } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((p) => {
        const matchesCategory =
            filteredCategory === "all" || p.category === filteredCategory;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) return <h2 className="loading">Loading Products...</h2>;

    return (
        <div className="products-container">
            <h1 className="page-title">🛍️ Products</h1>

            <div className="filters">
                <button onClick={() => setFilteredCategory("all")}>All</button>
                <button onClick={() => setFilteredCategory("men's clothing")}>Men</button>
                <button onClick={() => setFilteredCategory("women's clothing")}>Women</button>
                <button onClick={() => setFilteredCategory("jewelery")}>Jewellery</button>
                <button onClick={() => setFilteredCategory("electronics")}>Electronics</button>
            </div>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="product-img"
                                onClick={() => navigate(`/product/${product.id}`)}
                            />
                            <h3>{product.title}</h3>
                            <p className="price">₹{product.price}</p>
                            <p className="category">{product.category}</p>
                            <button
                                className="add-cart-btn"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                            {/* <button
                                className="details-btn"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                View Details
                            </button> */}
                        </div>
                    ))
                ) : (
                    <p className="no-results">No products found...</p>
                )}
            </div>
        </div>
    );
}

export default Productspage;