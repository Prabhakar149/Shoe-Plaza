import "./Cart.css";
import { useNavigate } from "react-router";

import { useData } from "../../contexts/DataContext";
import CartDetails from "./CartDetails";
import CartPrice from "./CartPrice";


const Cart = () => {

  const navigate = useNavigate();

  const { cart } = useData();
  const cartLength = cart.length;

  const checkoutBtnHandler = () =>{
    navigate("/checkout");
  }

  return (
    <div className="cart-container">
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

            <div className="cart-price-card-btn">
              <button onClick={checkoutBtnHandler}>Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="empty-cart">There is no item in the Cart !</h3>
      )}
    </div>
  );
};

export default Cart;
