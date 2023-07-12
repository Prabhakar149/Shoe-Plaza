import "./Cart.css";
import { useNavigate } from "react-router";
import empty_cart from "../../assets/empty_cart.jpg";
import { useData } from "../../contexts/DataContext";
import CartDetails from "./CartDetails";
import CartPrice from "./CartPrice";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";

const Cart = () => {
  const navigate = useNavigate();

  const { cart, loader, setLoader } = useData();
  const cartLength = cart.length;

  const checkoutBtnHandler = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  return (
    <div className="cart-container">
      {loader && <Loader />}
      <h2>My Cart ({cartLength})</h2>
      {cartLength > 0 ? (
        <div className="cart-details-main">
          <div className="cart-main">
            {cart.map((item) => (
              <div key={item._id} className="cart-details">
                <CartDetails product={item} />
              </div>
            ))}
          </div>
          <div className="cart-price-details">
            <CartPrice />

            <div className="primary-btn cart-price-card-btn">
              <button onClick={checkoutBtnHandler}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src={empty_cart} alt="Empty Cart"></img>
          <h3 className="empty-cart">There is No Item in the Cart 😑!</h3>
          <button className="shop-now-btn" onClick={() => navigate("/product")}>
            Shop Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
