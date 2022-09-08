import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  
  const [title,setTitle] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")


  const navigate = useNavigate()
  const params = useParams();
  
  // to fetch only the product to edit
  useEffect(() => {
    fetch(`http://localhost:8000/products/${params.productID}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title)
        setPrice(data.price)
        setCategory(data.category)
      });
      
  }, [params.productID]);


  console.log(title,price,category);

  // on form submit send the edited product to products list
  const handlSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/products/${params.productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        price: price,
        category: category,
      })
    })
      .then(res => res.json())
      .then(data => navigate("/dashboard/products"));
  };
  return (
    <form className="pt-5" onSubmit={handlSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="title" aria-describedby="title" />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} id="price" />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          category
        </label>
        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}id="category" />
      </div>
      <button type="submit" className="btn btn-primary">
        Edit Product
      </button>
    </form>
  );
};

export default EditProduct;
