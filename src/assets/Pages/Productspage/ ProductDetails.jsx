import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../Componetcs/ProductsSection/CartContext";
import "./ProductDetails.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.image);
        setLoading(false);
      })
      .catch(err => console.error("Error:", err));
  }, [id]);

  if (loading) return <h2 className="loading">Loading product...</h2>;
  if (!product) return <h2>Product not found!</h2>;

  const galleryImages = [product.image, product.image, product.image, product.image];

  const handleBuyNow = () => {
    const userEmail = localStorage.getItem("userEmail");
    localStorage.setItem("lastViewedProduct", JSON.stringify(product));

    if (!userEmail) {
      navigate("/login"); // first login
    } else {
      navigate("/offer", { state: { product } });
    }
  };

  return (
    <div className="product-detail-container">
      <div className="image-section">
        <img src={selectedImage} alt={product.title} className="main-image" />
        <div className="thumbnail-row">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumb"
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="details-section">
        <h2 style={{ fontFamily: "arial" }}>{product.title}</h2>
        <p className="category">Category: {product.category}</p>
        <p className="price">₹{product.price}</p>
        <p className="rating">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
        <p className="description">{product.description}</p>

        <div className="actions">
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;