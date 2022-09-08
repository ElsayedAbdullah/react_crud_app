import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    price: "",
    category: ""
  });

  const [categories, setCategories] = useState()

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.id]: e.target.value
    });
  };

  // Get All Categories
  const getAllCategories = () => {
    fetch("http://localhost:8000/categories")
    .then(res => res.json())
    .then(data => setCategories(data))
  }

  // useEffect
  useEffect(()=> {
    getAllCategories()
  },[])

  // Add Product
  const handlSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
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
        <input type="text" className="form-control" onChange={handleChange} id="title" placeholder="Enter Title"  />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input type="text" className="form-control" onChange={handleChange} id="price" placeholder="Enter Price" />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          category
        </label>
        <select onChange={handleChange} name="category" id="category" className="form-control form-select" placeholder="Choose Category" defaultValue={'DEFAULT'}>
          <option value='DEFAULT' disabled>
            Select Category
          </option>
          {categories && categories.map(category=>(
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
