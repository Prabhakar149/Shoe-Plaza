import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { initialState, dataReducer } from "../Reducers/DataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [drawer, setDrawer] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totalPrice,setTotalPrice] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState(state.address[0]);

  const fetchCategoryData = async () => {
    try {
      const response = await fetch("/api/categories");
      const category = await response.json();

      dispatch({
        type: "CATEGORY",
        payload: category.categories,
      });
    } catch (err) {
      console.error(err);
    }
  };

  
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const products = await response.json();

      dispatch({
        type: "ALL_PRODUCTS",
        payload: products.products,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategoryData();
    fetchProducts();
  }, []);


  // console.log(state)

  return (
    <DataContext.Provider
      value={{
        categories: state.categories,
        products:state.products,
        cart:state.cart,
        wishlist:state.wishlist,
        priceRange:state.priceRange,
        selectedCategory:state.selectedCategory,
        sortByRating:state.sortByRating,
        sortByPrice:state.sortByPrice,
        search:state.search,
        address:state.address,
        orderPlacedItems:state.orderPlacedItems,
        dispatch,
        drawer,
        setDrawer,
        loader,
        setLoader,
        totalPrice,
        setTotalPrice,
        deliveryAddress, 
        setDeliveryAddress
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
