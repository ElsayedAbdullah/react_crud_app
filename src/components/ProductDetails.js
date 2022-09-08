import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  console.log(params);

  const [product, setProduct] = useState({});
  const api_url = "http://localhost:8000/products";

  useEffect(() => {
    fetch(`${api_url}/${params.productID}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [params.productID]);

  console.log(product);
  return (
    <div className="container">
      <div className="py-5 w-50">
        <img className="img-fluid product-image" src={product.image} alt={product.title} />
        <h2 className="mt-5 mb-3">{product.title}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Category: </strong> {product.category}
        </p>
        <p>
          <strong>Price: </strong>${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
