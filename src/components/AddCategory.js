import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.value);
  };

  const handlSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: name})
    })
      .then(res => res.json())
      .then(data => navigate("/dashboard/categories"));
  };
  return (
    <form className="pt-5" onSubmit={handlSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Name
        </label>
        <input type="text" className="form-control" onChange={handleChange} id="title" placeholder="Enter Category Name"  />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
