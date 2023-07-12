import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import { getPricePercentage } from "../../Services/pricePercentage";
import { addToCart } from "../../Services/cartService";
import { addToWishlist } from "../../Services/wishlistService";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";

const ProductDetails = () => {
  const { productId } = useParams();
  const { products } = useData();

  const product = products?.find((item) => item._id === productId);

  const navigate = useNavigate();
  const { token } = useAuth();
  const { cart, wishlist, dispatch } = useData();
  const [isbtnClicked, setIsBtnClicked] = useState(false);

  const cartBtnTxt = cart.find((item) => item._id === product._id)
    ? "Go to Cart"
    : "Add to Cart";

  const wishlistBtnTxt = wishlist.find((item) => item._id === product._id)
    ? "Go to Wishlist"
    : "Add to Wishlist";

  const backBtnHandler = () => {
    navigate("/product");
  };

  const addCartButtonHandler = () => {
    if (token) {
      if (cartBtnTxt === "Go to Cart") {
        navigate("/cart");
      } else {
        setIsBtnClicked(true);
        setTimeout(() => setIsBtnClicked(false), 500);
        toast.success("Item added to Cart");
        addToCart(product, token, dispatch);
      }
    } else {
      navigate("/login");
    }
  };

  const addWishlistButtonHandler = () => {
    if (token) {
      if (wishlistBtnTxt === "Go to Wishlist") {
        navigate("/wishlist");
      } else {
        toast.success("Item added to Wishlist !");
        addToWishlist(product, token, dispatch);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {products.length === 0 ? (
        <Loader />
      ) : (
        <div className="product-details-container">
          <div className="back-btn" onClick={backBtnHandler}>
            <i className="fa fa-arrow-left"></i>
          </div>
          <div className="product-image">
            <img src={product.img} alt=""></img>
          </div>
          <div className="product-details">
            <div className="product-brand-category">
              <h3>{product.brand}</h3>
              <p>{product.categoryName}</p>
            </div>
            <div className="product-rating-reviews">
              <p className="product-rating">
                Rating: <span>{product.rating}</span> <i className="fa fa-star"></i>
              </p>
              <p className="product-reviews">
                Reviews:<span>{product.total_reviews}</span>
              </p>
            </div>
            <div className="product-price-details">
              <p>
                <span className="product-price">₹{product.price}</span>
                <span className="product-original-price">
                  ₹{product.original_price}
                </span>
                <span className="percentage-off">
                  ({getPricePercentage(product.price, product.original_price)}% OFF)
                </span>
              </p>
            </div>
            <hr />
            <div className="product-description">
              <p>
                <span>Description:</span> {product.description}
              </p>
              <p>
                <span>Delivery:</span> in {product.delivery_time} days
              </p>
            </div>

            <div>
              <div className="primary-btn product-card-btn">
                <button
                  onClick={addCartButtonHandler}
                  disabled={isbtnClicked ? true : false}
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i> {cartBtnTxt}{" "}
                </button>
              </div>
              <div className="primary-btn product-card-btn secondary-btn">
                <button onClick={addWishlistButtonHandler}>
                  {" "}
                  <i className="fa fa-heart"></i> {wishlistBtnTxt}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
