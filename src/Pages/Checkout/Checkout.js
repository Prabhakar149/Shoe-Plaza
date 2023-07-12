import "./Checkout.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import CartPrice from "../Cart/CartPrice";
import Loader from "../../Components/Loader/Loader";
import { razorPay } from "../../Services/razorPay";
import { removeFromCart } from "../../Services/cartService";

const Checkout = () => {
  const { address, cart, loader,dispatch, setLoader, totalPrice } = useData();
  const {token} = useAuth()
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState(address[0]);

  const cartItemsId = cart.map(({ _id }) => _id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  const addressInputHandle = (e, add) => {
    if (e.target.checked) {
      setDeliveryAddress(add);
    }
  };

  const orderBtnHandler = () =>{
    if(address.length>0){
      if(!deliveryAddress){
        toast.warning("Please select an address !");
      }else{
        razorPay(totalPrice,cartItemsId,removeFromCart,dispatch,token,navigate);
        toast.success("Your Order Placed !");
      }
    }else{
      toast.warning("Please add an address !");
      navigate("/userprofile")
    }
   
  }

  return (
    <>
      {loader && <Loader />}
      <div className="checkout-heading">
        <h2>Checkout</h2>
      </div>

      <div className="checkout-container">
        <div className="checkout-address">
          <h3>Address Details</h3>
          {address.length > 0 &&
            address?.map((add) => {
              const { id, fName, lName, mobile, town, pincode, city, state } =
                add;
              return (
                <div
                  key={id}
                  className={`user-address-details checkout-address-details ${
                    deliveryAddress.id === id ? "address-bg" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="address-radio"
                    checked={deliveryAddress.id === id}
                    onChange={(e) => {
                      addressInputHandle(e, id, add);
                    }}
                  ></input>
                  <div>
                    <h4>
                      {fName} {lName}
                    </h4>
                    <p>
                      {town}, {pincode}, {city}
                    </p>
                    <p>{state}</p>
                    <p>Phone No: {mobile}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="checkout-order-summary">
          <div className="order-details">
            <div>
              <h3>Order Details</h3>
            </div>
            <hr />
          </div>

          <div className="checkout-item-details">
            <p>Item </p> <span className="quantity-text">Quantity</span>
            {cart.map(({ _id, color, categoryName, brand, qty }) => (
              <div key={_id}>
                <p>
                  {color} {categoryName} ({brand}){" "}
                </p>{" "}
                <span>{qty}</span>
              </div>
            ))}
            <hr />
          </div>
          <div className="checkout-cart-price">
            <CartPrice />
          </div>

          <div className="delivery-address">
            <h3>Deliver To</h3>
            <hr />
            {deliveryAddress && (
              <div className="delivery-address-details">
                <h4>
                  {deliveryAddress.fName} {deliveryAddress.lName}
                </h4>
                <p>
                  {deliveryAddress.town}, {deliveryAddress.pincode},{" "}
                  {deliveryAddress.city}
                </p>
                <p>{deliveryAddress.state}</p>
                <p>{deliveryAddress.mobile}</p>
              </div>
            )}
          </div>

          <div className="checkout-btn">
            <button onClick={orderBtnHandler}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
