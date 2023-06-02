import "./ProductCard.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { getPricePercentage } from "../../Services/pricePercentage";
import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import { addToCart } from "../../Services/cartService";
import { addToWishlist,removeFromWishlist } from "../../Services/wishlistService";


const ProductCard = ({ product }) => {
  const { _id, img, brand, rating, total_reviews, price, original_price } =
    product;

  const navigate = useNavigate();
  const { token } = useAuth();
  const { cart, wishlist, dispatch } = useData();

  const [isbtnClicked,setIsBtnClicked] = useState(false);

  const cartBtnTxt = cart.find((item) => item._id === _id)
    ? "Go to Cart"
    : "Add to Cart";
  const wishlistIconColor = wishlist.find((item) => item._id === _id)
    ? "red"
    : "gray";

  const productClickHandler = () => {
    navigate(`/product/${_id}`);
  };

  const addCartButtonHandler = () => {
    if (token) {
      if (cartBtnTxt === "Go to Cart") {
        navigate("/cart");
      } else {
        setIsBtnClicked(true)
        setTimeout(()=>setIsBtnClicked(false),500)
        toast.success("Item added to Cart !");
        addToCart(product, token, dispatch);
      }
    } else {
      navigate("/login");
    }
  };

  const addRemoveWishlistButtonHandler = () => {
    if (token) {
      if(wishlistIconColor === "red"){
        toast.warning("Item removed from wishlist !");
        removeFromWishlist(token,_id,dispatch);
      }else{
        toast.success("Item added to Wishlist !");
        addToWishlist(product, token, dispatch);
      }
      
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="card">
        <img
          onClick={productClickHandler}
          className="card-img"
          src={img}
          alt={brand}
        ></img>
        <span
          className="wishlist-icon"
          onClick={addRemoveWishlistButtonHandler}
          style={{color:wishlistIconColor}}
        >
          {" "}
          <i className="fa fa-heart" aria-hidden="true"></i>
        </span>
        <div onClick={productClickHandler}>
          <div className="card-details">
            <h5>{brand}</h5>
            <p>
              <span>
                {rating} <i className="fa fa-star"></i>
              </span>{" "}
              | <span>{total_reviews}</span>
            </p>
          </div>
          <div className="price">
            <p>
              ₹{price}
              <span>₹{original_price}</span>
            </p>
            <p className="per">
              ({getPricePercentage(price, original_price)}% OFF)
            </p>
          </div>
        </div>

        <div className="add-to-cart">
          <button onClick={addCartButtonHandler} disabled={isbtnClicked ? true : false}>
            {" "}
            <i className="fa fa-shopping-cart"></i> {cartBtnTxt}
          </button>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
