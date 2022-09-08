import "./App.css";
import Header from "./components/Header";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Products from "./pages/Products";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductDetails from "./components/ProductDetails";
import Categories from "./pages/Categories";
import AddCategory from "./components/AddCategory";
import EditCategory from "./components/EditCategory";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="products" element={<Outlet />}>
            <Route path="" element={<Products />}></Route>
            <Route path="add-product" element={<AddProduct />} />
            <Route path=":productID" element={<ProductDetails />} />
            <Route path="edit/:productID" element={<EditProduct />} />
          </Route>
          <Route path="categories" element={<Outlet />}>
            <Route path="" element={<Categories />}></Route>
            <Route path="add-category" element={<AddCategory />} />
            <Route path="edit/:catID" element={<EditCategory />} />
          </Route>
        </Route>
          <Route path="/products/:productID" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
