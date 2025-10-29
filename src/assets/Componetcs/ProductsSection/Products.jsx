import React, { useContext } from "react";
import { Row, Col } from "antd";
// import { CartContext } from "../../../context/CartContext";
import ProductsData from './ProductsData'
import "./Products.css";
import { CartContext } from "../ProductsSection/CartContext";

function Products() {
    const { addToCart, searchQuery } = useContext(CartContext);


    const filteredProducts = ProductsData.filter((p) =>
        p.Productsname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    


    return (
        <div className="products-page-container">
            <h2 className="text-3xl font-bold mb-6 mt-4">Featured Products</h2>

            <Row gutter={[16, 24]}>
                {filteredProducts.map((product, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <div className="product-card">
                            <div className="product-image-container">
                                <img src={product.img} alt={product.Productsname} className="product-img" />
                            </div>
                            <div className="product-details">
                                <h3>{product.Productsname}</h3>
                                <p>₹{product.price.toLocaleString("en-IN")}</p>
                                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Products;