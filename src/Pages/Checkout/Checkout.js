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
import AddressForm from "../UserProfile/Component/AddressForm";

const Checkout = () => {
  const {
    address,
    cart,
    loader,
    dispatch,
    setLoader,
    totalPrice,
    deliveryAddress,
    setDeliveryAddress,
  } = useData();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [addressClickedId, setAddressClickedId] = useState(deliveryAddress.id);

  const addressData = {
    fName: "",
    lName: "",
    mobile: "",
    town: "",
    pincode: "",
    city: "",
    state: "",
  };
  const [addressForm, setAddressForm] = useState(addressData);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [isEditBtnClicked, setIsBtnClicked] = useState({
    editBtn: false,
    addressIndex: null,
  });

  const cartItemsId = cart.map(({ _id }) => _id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  const addressInputHandle = (e, id, add) => {
    if (e.target.checked) {
      setAddressClickedId(id);
      setDeliveryAddress(add);
    }
  };

  const addAddressBtnHandler = () => {
    setAddressForm(addressData);
    setIsBtnClicked({ editBtn: false, addressIndex: null });
    setAddNewAddress(!addNewAddress);
  };

  const orderBtnHandler = () => {
    if (address.length > 0) {
      if (!deliveryAddress) {
        toast.warning("Please select an address !");
      } else {
        razorPay(
          totalPrice,
          cartItemsId,
          removeFromCart,
          dispatch,
          token,
          navigate,
          cart,
          toast
        );
      }
    } else {
      toast.warning("Please add an address !");
      navigate("/userprofile");
    }
  };

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
                    addressClickedId === id ? "address-bg" : ""
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

          <div className="primary-btn checkout-new-address-btn">
            <button onClick={addAddressBtnHandler}>+ Add New Address</button>
          </div>
        </div>

        {addNewAddress && (
          <>
            <div
              className="dark-bg"
              onClick={() => {
                setAddNewAddress(false);
              }}
            >
              {" "}
            </div>
            <div className="user-container address-container checkout-new-address">
              <AddressForm
                setAddNewAddress={setAddNewAddress}
                addressFormData={addressForm}
                isEditBtnClicked={isEditBtnClicked}
                setIsBtnClicked={setIsBtnClicked}
              />
            </div>
          </>
        )}

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

          <div className="primary-btn checkout-btn">
            <button onClick={orderBtnHandler}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
