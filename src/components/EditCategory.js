import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const params = useParams();


  const handleChange = e => {
    setName(e.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:8000/categories/${params.catID}`)
      .then(res => res.json())
      .then(data => setName(data.name));
  }, [params.catID]);

  const handlSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:8000/categories/${params.catID}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name })
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
        <input type="text" className="form-control" value={name} onChange={handleChange} id="title" placeholder="Enter Category Name" />
      </div>
      <button type="submit" className="btn btn-primary">
        Edit Category
      </button>
    </form>
  );
};

export default EditCategory;
