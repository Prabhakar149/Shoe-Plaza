import "./AddressForm.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

import { useData } from "../../../contexts/DataContext";

const AddressForm = ({ setAddNewAddress, addressFormData, isEditBtnClicked,setIsBtnClicked}) => {
  const { dispatch } = useData();

  const [addressForm, setAddressForm] = useState(addressFormData);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveAddressBtnHandler = () => {
    const { fName, lName, mobile, town, pincode, city, state } = addressForm;

    if (fName && lName && mobile && town && pincode && city && state) {
      if (isEditBtnClicked.editBtn) {
        toast.success("Successfully updated the address!");
        dispatch({
          type: "EDIT_EXISTING_ADDRESS",
          payload: [isEditBtnClicked.addressIndex, addressForm],
        });
        setIsBtnClicked({ editBtn: false, addressIndex: null });
       
      } 
      else {
        toast.success("Successfully added the address!");
        dispatch({
          type: "ADD_NEW_ADDRESS",
          payload: {id:uuid(), ...addressForm},
        });
      }
      setAddNewAddress(false);
    } else {
      toast.warning("Please fill all the details !");
    }
  };

  return (
    <>
      <div className="new-address">
        <h3>Add New Address</h3>
        <div className="address-inputs">
          <input
            type="text"
            placeholder="Enter First Name"
            name="fName"
            value={addressForm.fName}
            onChange={inputChangeHandler}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lName"
            value={addressForm.lName}
            onChange={inputChangeHandler}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            name="mobile"
            value={addressForm.mobile}
            onChange={inputChangeHandler}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter Town"
            name="town"
            value={addressForm.town}
            onChange={inputChangeHandler}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter Pincode"
            name="pincode"
            value={addressForm.pincode}
            onChange={inputChangeHandler}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter City"
            name="city"
            value={addressForm.city}
            onChange={inputChangeHandler}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter State"
            name="state"
            value={addressForm.state}
            onChange={inputChangeHandler}
            required
          ></input>
          <div className="address-form-btn">
            <button className="save-btn" onClick={saveAddressBtnHandler}>
              Save
            </button>
            <button
              className="cancel-btn"
              onClick={() => setAddNewAddress(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
