import "./Navbar.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useData } from "../../contexts/DataContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { products, cart, wishlist, dispatch } = useData();
  const [searchInput, setSearchInput] = useState();

  const activeLink = ({ isActive }) => {
    return {
      color: isActive ? "#816907" : "white",
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
              placeholder="Search shoes by color"
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
                  <span style={{ display: wishlist.length === 0 && "none" }}>
                    {wishlist.length}
                  </span>
                </i>
              </span>
            </NavLink>

            <NavLink to="/cart" style={activeLink}>
              <span className="navbar-link">
                <i className="icon fa fa-shopping-cart" title="Cart">
                  <span style={{ display: cart.length === 0 && "none" }}>
                    {cart.length}
                  </span>
                </i>
              </span>
            </NavLink>

            <NavLink to="/userprofile" style={activeLink}>
              <span className="navbar-link">
                <i className="icon fa fa-user" title="User"></i>
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
