import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2">
          <ul className="list-unstyled sidebar h-100 text-dark bg-light">
            <li className="mb-3">
              <Link to="products" className="text-decoration-none sidebar-link">
                All Products
              </Link>
            </li>
            <li>
              <Link to="categories" className="text-decoration-none sidebar-link">
                All Categories
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
