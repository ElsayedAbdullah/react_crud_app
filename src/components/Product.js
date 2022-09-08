import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, showButton }) => {
  return (
    <div className="card w-100">
      <img src={product.image? product.image : "https://via.placeholder.com/150"} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h6 className="card-title opacity-75">{product.title}</h6>
        <p><strong>Price:</strong> <em>${product.price}</em></p>
        {showButton && (
          <Link to={`/products/${product.id}`} className="btn btn-primary">
            Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;
