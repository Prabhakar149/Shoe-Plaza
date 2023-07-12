import "./Wishlist.css";
import empty_wishlist from "../../assets/empty-wishlist.png";
import { useData } from "../../contexts/DataContext";
import WishlistDetails from "./WishlistDetails";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router";

const Wishlist = () => {
  const { wishlist, loader, setLoader } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  return (
    <>
      {loader && <Loader />}
      <div className="wishlist-container">
        <h2>My Wishlist ({wishlist.length})</h2>
        {wishlist.length > 0 ? (
          <div className="wishlist-details-main">
            <div className="wishlist-main">
              {wishlist.map((item) => (
                <div key={item._id} className="wishlist-details">
                  <WishlistDetails product={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <img className="empty-wishlist-img" src={empty_wishlist} alt="Empty Wishlist"></img>
            <h3 className="empty-wishlist">
              There is No Item in the Wishlist 😥
            </h3>
            <button
              className="shop-now-btn"
              onClick={() => navigate("/product")}
            >
              Shop Now
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
