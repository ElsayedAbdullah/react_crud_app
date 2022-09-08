import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    fetch("http://localhost:8000/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDelete = category => {
    console.log(category.id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your category has been deleted.", "success");

        fetch(`http://localhost:8000/categories/${category.id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => getAllCategories());
      }
    });
  };

  return (
    <div className="categories-section">
      <div className="text-end my-5">
        <Link to="add-category" className="add btn btn-primary">
          Add Category
        </Link>
      </div>
      <div className="categories">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {categories.map(category => (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{ category.name}</td>
                <td className="settings text-end">
                  <Link to={`edit/${category.id}`} className="btn btn-success btn-sm m-2">Edit</Link>
                  <button className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(category)}>
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
