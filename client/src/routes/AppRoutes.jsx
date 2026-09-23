import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Quote from "../pages/Quote";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";


import AdminRoute from "../components/admin/AdminRoute";


export default function AppRoutes() {
  return (
    <Routes>
      {" "}
      {/* Home */} <Route path="/" element={<Home />} /> {/* About */}{" "}
      <Route path="/about" element={<About />} /> {/* Products */}{" "}
      <Route path="/products" element={<Products />} />{" "}
      <Route path="/products/:slug" element={<ProductDetails />} /> {/* Cart */}{" "}
      <Route path="/cart" element={<Cart />} /> {/* Checkout */}{" "}
      <Route path="/checkout" element={<Checkout />} /> {/* Orders */}{" "}
      <Route path="/quote" element={<Quote />} />
      <Route path="/orders" element={<Orders />} /> {/* Dashboard */}{" "}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/dashboard" element={ <AdminRoute> <Dashboard /> </AdminRoute> } />
      <Route
        path="*"
        element={
          <div className="flex min-h-[60vh] items-center justify-center">
            {" "}
            <div className="text-center">
              {" "}
              <h1 className="text-4xl font-black text-slate-900"> 404 </h1>{" "}
              <p className="mt-2 text-slate-500"> Page not found </p>{" "}
            </div>{" "}
          </div>
        }
      />{" "}
    </Routes>
  );
}
