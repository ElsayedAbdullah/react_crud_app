import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    fetch("http://localhost:8000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = product => {
    console.log(product.id);

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
        Swal.fire("Deleted!", "Your product has been deleted.", "success");

        fetch(`http://localhost:8000/products/${product.id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => getAllProducts());
      }
    });
  };

  return (
    <div className="products-section">
      <div className="text-end my-5">
        <Link to="add-product" className="add btn btn-primary">
          Add Product
        </Link>
      </div>
      <div className="products">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{ product.title.length > 20 ? `${product.title.substring(0, 30)}...`: product.title}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td className="settings text-end">
                  <Link to={`edit/${product.id}`} className="btn btn-success btn-sm m-2">Edit</Link>
                  <Link to={`${product.id}`} className="btn btn-info btn-sm m-2">
                    view
                  </Link>
                  <button className="btn btn-danger btn-sm m-2" onClick={() => handleDelete(product)}>
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

export default Products;
