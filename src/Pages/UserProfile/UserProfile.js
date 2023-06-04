import "./UserProfile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";
import { useData } from "../../contexts/DataContext";
import AddressForm from "./Component/AddressForm";
import Loader from "../../Components/Loader/Loader";

const UserProfile = () => {
  const { user, setToken, setUser } = useAuth();
  const {products, dispatch, address, loader, setLoader } = useData();
  const navigate = useNavigate();
  const [isProfileChecked, setIsProfileChecked] = useState(true);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [isEditBtnClicked, setIsBtnClicked] = useState({
    editBtn: false,
    addressIndex: null,
  });

  const { firstName, lastName, email } = user;

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

  const logoutButtonHandle = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
    dispatch({
      type: "CLEAR",
      payload: products,
    });
    navigate("/userprofile");
  };

  const profileNavClickhandler = () => {
    setIsProfileChecked(true);
  };
  const addressNavClickhandler = () => {
    setIsProfileChecked(false);
  };
  const addAddressBtnHandler = () => {
    setAddressForm(addressData);
    setIsBtnClicked({ editBtn: false, addressIndex: null });
    setAddNewAddress(true);
  };
  const editBtnHandler = (add, i) => {
    setAddressForm(add);
    setIsBtnClicked({ editBtn: true, addressIndex: i });
    setAddNewAddress(true);
  };

  const removeBtnHandler = (i) => {
    dispatch({
      type: "REMOVE_ADDRESS",
      payload: i,
    });
    toast.error("Address Removed !");
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  return (
    <>
      {loader && <Loader />}
      {!addNewAddress ? (
        <div className="user-container">
          <div className="user-nav">
            <nav
              onClick={profileNavClickhandler}
              className={`${isProfileChecked ? "nav-btn" : ""} `}
            >
              <p>Profile</p>
            </nav>
            <nav
              onClick={addressNavClickhandler}
              className={`${!isProfileChecked ? "nav-btn" : ""} `}
            >
              <p>Address</p>
            </nav>
          </div>

          {isProfileChecked ? (
            <div className="profile-details">
              <h3>Profile Details</h3>
              <div className="profile-name-email">
                <p>
                  <span>Name:</span> {firstName} {lastName}
                </p>
                <p>
                  <span>Email:</span> {email}
                </p>
              </div>

              <button onClick={logoutButtonHandle}>Logout</button>
            </div>
          ) : (
            <>
              <div className="address-details">
                <h3>Address Details</h3>
                {address.length > 0 &&
                  address?.map((add, index) => {
                    const { fName, lName, mobile, town, pincode, city, state } =
                      add;
                    return (
                      <div key={index} className="user-address-details">
                        <h4>
                          {fName} {lName}
                        </h4>
                        <p>
                          {town}, {pincode}(Pincode)
                        </p>
                        <p>{city}</p>
                        <p>{state}</p>
                        <p>Phone No: {mobile}</p>
                        <div className="address-btn">
                          <button
                            className="edit-btn"
                            onClick={() => editBtnHandler(add, index)}
                          >
                            Edit
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => {
                              removeBtnHandler(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}

                <h3 className="add-address" onClick={addAddressBtnHandler}>
                  + Add New Address
                </h3>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="user-container address-container">
          <AddressForm
            setAddNewAddress={setAddNewAddress}
            addressFormData={addressForm}
            isEditBtnClicked={isEditBtnClicked}
            setIsBtnClicked={setIsBtnClicked}
          />
        </div>
      )}
    </>
  );
};
export default UserProfile;
