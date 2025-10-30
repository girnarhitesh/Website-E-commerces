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

  // ✅ Ye line updated hai — fakestoreapi ke badle apne local backend ko hit kar raha hai
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      filteredCategory === "all" || p.category === filteredCategory;
    const matchSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) return <h2>Loading Products...</h2>;

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
        {filteredProducts.map((product) => (
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
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productspage;