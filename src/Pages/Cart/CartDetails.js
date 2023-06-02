import "./CartDetails.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { getPricePercentage } from "../../Services/pricePercentage";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import { updateCartQuantity, removeFromCart } from "../../Services/cartService";
import { addToWishlist } from "../../Services/wishlistService";

const CartDetails = ({ product }) => {
  const { _id, img, brand, price, original_price, qty, description } = product;

  const { wishlist, dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();

  const wishlistBtnTxt = wishlist.find((item) => item._id === _id)
    ? "Already in wishlist"
    : "Move to wishlist";

  const productClickHandler = () => {
    navigate(`/product/${_id}`);
  };

  const updateCartQtyBtnHandler = (type) => {
    updateCartQuantity(type, _id, dispatch, token);
  };

  const removeCartBtnHandler = () => {
    removeFromCart(token, _id, dispatch);
    toast.error("Item removed from Cart !");
  };

  const wishlistBtnHandler = () => {
    if (wishlistBtnTxt === "Move to wishlist") {
      addToWishlist(product,token,dispatch);
      removeFromCart(token, _id, dispatch);
      toast.success("Item moved to wishlist !");
    } else {
      navigate("/wishlist");
    }
  };

  return (
    <div className="cart-item-container">
      <div className="cart-img" onClick={productClickHandler}>
        <img src={img} alt="cart-img"></img>
      </div>

      <div className="cart-item-details">
        <div className="cart-item-brand-category">
          <h4>{brand}</h4>
          <p>{description}</p>
        </div>

        <div>
          <button
            className="quantity-btn decrement-btn"
            onClick={() => updateCartQtyBtnHandler("Decrease")}
            disabled={qty === 1 ? true : false}
            style={{
              backgroundColor: qty === 1 ? "rgb(225, 223, 223)" : "#e3bd23",
            }}
          >
            -
          </button>
          <span className="quantity">{qty}</span>
          <button
            className="quantity-btn increment-btn"
            onClick={() => updateCartQtyBtnHandler("Increase")}
          >
            +
          </button>
        </div>

        <div className="cart-item-price-details">
          <p>
            <span className="cart-item-price">₹{price}</span>
            <span className="cart-item-original-price">₹{original_price}</span>
            <span className="percentage-off">
              ({getPricePercentage(price, original_price)}% OFF)
            </span>
          </p>
        </div>

        <div>
          <div className="cart-item-card-btn item-add-cart">
            <button onClick={removeCartBtnHandler}>
              {" "}
              <i className="fa fa-shopping-cart"></i> Remove from Cart
            </button>
          </div>
          <div className="cart-item-card-btn item-add-wishlist">
            <button onClick={wishlistBtnHandler}>
              {" "}
              <i className="fa fa-heart"></i> {wishlistBtnTxt}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
