import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/LoginRegister/Login";
import Register from "./Pages/LoginRegister/Register";
import RequireAuth from "./Authentication/RequireAuth";
import Product from "./Pages/Product/Product";
import ProductDetails from "./Pages/Product/ProductDetails";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Checkout from "./Pages/Checkout/Checkout";
import Error from "./Pages/404/Error";
import OrderPlaced from "./Pages/OrderPlaced/OrderPlaced";


function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose="1000"
        // limit="1"
        style={{ top: "5rem", right: "0rem" }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<Error/>} />
        <Route path="/mockman" element={<Mockman />} />
        <Route
          path="/userprofile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout/>
            </RequireAuth>
          }
        />
        <Route
          path="/orderplaced"
          element={
            <RequireAuth>
              <OrderPlaced/>
            </RequireAuth>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
