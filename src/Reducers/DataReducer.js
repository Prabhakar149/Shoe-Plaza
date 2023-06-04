import { v4 as uuid } from "uuid";

export const initialState = {
  categories: [],
  products: [],
  cart: [],
  wishlist: [],
  priceRange: "1500",
  selectedCategory: [],
  sortByRating: "",
  sortByPrice: "",
  search: "",
  address: [
    {
      id: uuid(),
      fName: "Aman",
      lName: "Mishra",
      mobile: "9876543210",
      town: "ward 45, Right Town",
      pincode: "482001",
      city: "Jabalpur",
      state: "Madhya Pradesh",
    },
  ],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY":
      return {
        ...state,
        categories: action.payload,
      };
    case "ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "PRICE_RANGE":
      return {
        ...state,
        priceRange: action.payload,
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload.isChecked
          ? [...state.selectedCategory, action.payload.val]
          : [
              ...state.selectedCategory.filter(
                (cat) => cat !== action.payload.val
              ),
            ],
      };
    case "SORT_BY_RATING":
      return {
        ...state,
        sortByRating: action.payload,
      };
    case "SORT_BY_PRICE":
      return {
        ...state,
        sortByPrice: action.payload,
      };
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "CLEAR":
      return {
        ...state,
        priceRange: "1500",
        selectedCategory: [],
        sortByRating: "",
        sortByPrice: "",
        search: "",
        products: action.payload,
      };
    case "ADD_NEW_ADDRESS":
      return {
        ...state,
        address: [...state.address, { ...action.payload }],
      };
    case "REMOVE_ADDRESS":
      return {
        ...state,
        address: state.address.filter((add, index) => index !== action.payload),
      };
    case "EDIT_EXISTING_ADDRESS":
      state.address[action.payload[0]] = action.payload[1];
      return {
        ...state,
        address: [...state.address],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "UPDATE_CART_PRODUCT_QTY":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};
