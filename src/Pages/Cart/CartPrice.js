import "./CartPrice.css";
import { useData } from "../../contexts/DataContext";

const CartPrice = () => {
  const { cart } = useData();

  const totalOriginalPrice = cart?.reduce(
    (acc, { original_price, qty }) => acc + original_price * qty,
    0
  );
  const totalPrice = cart?.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const discount = totalOriginalPrice - totalPrice;

  return (
    <>
      <div className="cart-price">
        <div>
          <h3>Price Details</h3>
        </div>
        <hr />
      </div>

      <div className="item-details">
        <p>Total Items </p> <span>{cart.length}</span>
        <p>Total Price </p> <span>₹ {totalOriginalPrice}</span>
        <p>Discount </p> <span>₹ {discount}</span>
        <hr></hr>
        <p>Total Amount to Pay </p> <span>₹ {totalPrice}</span>
        <hr />
      </div>
    </>
  );
};
export default CartPrice;
