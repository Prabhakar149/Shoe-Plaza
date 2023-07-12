import { useNavigate } from "react-router";
import { useData } from "../../contexts/DataContext";
import "./OrderPlaced.css";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { getPricePercentage } from "../../Services/pricePercentage";

const OrderPlaced = () => {
  const {
    orderPlacedItems,
    totalPrice,
    loader,
    setLoader,
    deliveryAddress: { fName, lName, mobile, town, pincode, city, state },
  } = useData();
  const navigate = useNavigate();
  const paymentId = localStorage.getItem("payment_key");

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  console.log(orderPlacedItems);

  return (
    <>
      {loader && <Loader />}
      <div className="order-container">
        <h2>Order Summary</h2>
        {orderPlacedItems.length === 0 ? (
          <>
            <h4>You haven't ordered any items 🙄</h4>
            <button className="shop-now-btn" onClick={() => navigate("/product")}>Shop Now</button>
          </>
        ) : (
          <div className="my-order">
            <div className="my-order-details">
              <h2>Order Confirmed</h2>
              <div>
                <p>Payment Id: {paymentId}</p>
                <p>Total Amount: ₹{totalPrice}</p>
                <p>Order will be delivered to below address:</p>
                <p style={{ fontWeight: "bold" }}>
                  {fName} {lName},
                </p>
                <p>
                  {town}, {pincode},
                </p>
                <p>{city},</p>
                <p>{state},</p>
                <p>Contact Number: {mobile}</p>
              </div>
            </div>
            <div className="my-order-items">
              {orderPlacedItems.map(
                ({
                  _id,
                  img,
                  brand,
                  categoryName,
                  price,
                  original_price,
                  qty,
                }) => (
                  <div key={_id} className="order-items-card">
                    <div className="order-item-img">
                      <img src={img} alt="brand"></img>
                    </div>
                    <div className="order-item-details">
                      <p className="order-item-name">
                        {brand} {categoryName}
                      </p>
                      <p>Quantity: {qty}</p>
                      <p className="order-item-price">
                        <span className="order-discount-price">₹{price}</span>
                        <span className="order-original-price">
                          ₹{original_price}
                        </span>
                      </p>
                      <p className="discount-percentage">
                        ({getPricePercentage(price, original_price)}% OFF)
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPlaced;
