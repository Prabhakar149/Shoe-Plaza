import "./WishlistDetails.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { getPricePercentage } from "../../Services/pricePercentage";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import { removeFromWishlist } from "../../Services/wishlistService";
import { addToCart, updateCartQuantity } from "../../Services/cartService";


const WishlistDetails = ({ product }) => {
  const { _id, img, brand, price, original_price, description } = product;

  const { cart, dispatch } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();

  const cartBtnTxt = cart?.find((item) => item._id === _id)
    ? "Already in Cart (Increase the Quantity)"
    : "Move to Cart";

  const productClickHandler = () => {
    navigate(`/product/${_id}`);
  };

  const cartBtnHandler = () => {
    if (cartBtnTxt === "Move to Cart") {
      addToCart(product, token, dispatch);
      removeFromWishlist(token, _id, dispatch);
      toast.success("Item moved to cart !");
    } else {
      updateCartQuantity("Increase",_id,dispatch,token);
      toast.success("Item increased by 1 in the Cart!");
      // navigate("/cart");
    }
  };

  const wishlistBtnHandler = () => {
    removeFromWishlist(token, _id, dispatch);
    toast.error("Item removed from wishlist !");
  };

  return (
    <>
      <div className="wishlist-item-container">
        <div className="wishlist-img" onClick={productClickHandler}>
          <img src={img} alt="wishlist-img"></img>
        </div>

        <div className="wishlist-item-details">
          <div className="wishlist-item-brand-category">
            <h4>{brand}</h4>
            <p>{description}</p>
          </div>

          <div className="wishlist-item-price-details">
            <p>
              <span className="wishlist-item-price">₹{price}</span>
              <span className="wishlist-item-original-price">
                ₹{original_price}
              </span>
              <span className="percentage-off">
                ({getPricePercentage(price, original_price)}% OFF)
              </span>
            </p>
          </div>

          <div className="wishlist-btn-container">
            <div className="wishlist-item-card-btn">
              <button onClick={cartBtnHandler}>
                {" "}
                <i className="fa fa-shopping-cart"></i> {cartBtnTxt}
              </button>
            </div>
            <div className="wishlist-item-card-btn item-wishlist">
              <button onClick={wishlistBtnHandler}>
                {" "}
                <i className="fa fa-heart"></i> Remove From Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistDetails;
