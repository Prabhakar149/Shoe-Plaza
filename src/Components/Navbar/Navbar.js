import "./Navbar.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { products, cart, wishlist, dispatch } = useData();
  const { token, setToken, setUser } = useAuth();
  const [searchInput, setSearchInput] = useState();

  const activeLink = ({ isActive }) => {
    return {
      color: isActive ? "#213555" : "white",
    };
  };

  const HomeBtnClickHandle = () => {
    dispatch({
      type: "CLEAR",
      payload: products,
    });
  };

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    navigate("/product");
  };

  const logoutIconHandle = () =>{
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
    dispatch({
      type: "CLEAR",
      payload: products,
    });
    navigate("/login");
    toast.success("Logged out successfully !");
  }

  useEffect(() => {
    dispatch({
      type: "SEARCH",
      payload: searchInput,
    });
  }, [searchInput, dispatch]);

  return (
    <>
      <div className="navbar">
        <nav className="nav-container">
          <div className="nav-left">
            <NavLink to="/" className="home-nav" onClick={HomeBtnClickHandle}>
              Shoe Plaza
            </NavLink>
          </div>
          <div className="nav-right">
            <i className="search-icon fa fa-search" title="search"></i>
            <input
              className="search"
              type="search"
              placeholder="search shoes by color"
              onChange={searchHandler}
            ></input>

            <NavLink to="/product" style={activeLink}>
              <span className="navbar-link">
                <i className="icon fa fa-shopping-bag" title="Products"></i>
              </span>
            </NavLink>

            <NavLink to="/wishlist" style={activeLink}>
              <span className="navbar-link">
                <i className="icon fa fa-heart" title="Wishlist">
                  {token && (
                    <span style={{ display: wishlist?.length === 0 && "none" }}>
                      {wishlist?.length}
                    </span>
                  )}
                </i>
              </span>
            </NavLink>

            <NavLink to="/cart" style={activeLink}>
              <span className="navbar-link">
                <i className="icon fa fa-shopping-cart" title="Cart">
                  {token && (
                    <span style={{ display: cart.length === 0 && "none" }}>
                      {cart.length}
                    </span>
                  )}
                </i>
              </span>
            </NavLink>

            <NavLink to="/userprofile" style={activeLink}>
              <span className="navbar-link">
                {token ? (
                  <i className="icon fa fa-user" title="User"></i>
                ) : (
                  <i className="icon fa fa-sign-in" title="login"></i>
                )}
              </span>
            </NavLink>

            <NavLink to="/login" style={activeLink}>
              <span className="navbar-link" onClick={logoutIconHandle}>
                {token && (
                  <i className="icon fa fa-sign-out" title="logout"></i>
                )}
              </span>
            </NavLink>

          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
