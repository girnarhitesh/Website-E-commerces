import React from 'react';
import './Homepage.css';
import Products from '../ProductsSection/Products';

function Homepage() {
    return (
        <>
  
            <div className="video-section">
                <div className="video-wrapper">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/video/Productsvideo.mp4"
                        className="product-video"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <Products />

        </>
    );
}

export default Homepage;