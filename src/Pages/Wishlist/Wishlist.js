import "./Wishlist.css";

import { useData } from "../../contexts/DataContext";
import WishlistDetails from "./WishlistDetails";

const Wishlist = () => {
  const { wishlist } = useData();

  return (
    <>
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
          <h3 className="empty-wishlist">There is no item in the Wishlist !</h3>
        )}
      </div>
    </>
  );
};

export default Wishlist;
