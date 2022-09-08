import React, { useEffect, useState } from "react";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterProducts,setFilterProducts]=useState([])

  // fetch products
  const fetchProducts = () => {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilterProducts(data)
      });
  };

  // fetch categories
  const fetchCategoriesNames = () => {
    fetch(`http://localhost:8000/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  // filter products by category
  const filterResult = catItem => {
    console.log(catItem);
    const result = products.filter(el => el.category === catItem);
    setFilterProducts(result);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesNames();
    // fetchCategoryItems();
  }, []);

  return (
    <div className="products my-5">
      <div className="container">
        <div className="row">
          <div className="text-center m-auto">
            <button className="btn btn-warning mx-2 my-4" onClick={() => fetchProducts(products)}>
              All
            </button>
            {categories.map(cat => (
              <button className="btn btn-warning mx-2 my-4" key={cat.id} onClick={() => filterResult(cat.name)}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="row">
          {filterProducts.map(product => {
            return (
              <div className="col-lg-3 d-flex mb-4" key={product.id}>
                <Product product={product} showButton={true} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
