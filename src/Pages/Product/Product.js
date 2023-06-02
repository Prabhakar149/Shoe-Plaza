import "./Product.css";
import { useEffect } from "react";

import { useData } from "../../contexts/DataContext";
import ProductsFilter from "../../Components/ProductsFilter/ProductsFilter";
import ProductCard from "./ProductCard";
import Loader from "../../Components/Loader/Loader";


const Product = () => {
  const {
    products,
    priceRange,
    selectedCategory,
    sortByRating,
    sortByPrice,
    search,
    drawer,
    setDrawer,
    loader,
    setLoader,
  } = useData();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  }, [setLoader]);

  // Filtering Products by Selected Category
  const check = (item, catName) => {
    return item.categoryName === catName ? true : false;
  };
  const filteredProductsBySelectedCategory =
    selectedCategory.length > 0
      ? products.reduce((acc, curr) => {
          for (let cat of selectedCategory) {
            const res = check(curr, cat);
            if (res) {
              return [...acc, curr];
            }
          }
          return acc;
        }, [])
      : [...products];

  // Filtering Products by Rating
  const filteredProductsByRating = sortByRating
    ? filteredProductsBySelectedCategory.filter(
        (item) => item.rating >= sortByRating
      )
    : filteredProductsBySelectedCategory;

  // Filtering Products by Price
  const filteredProductsByPrice = sortByPrice
    ? sortByPrice === "LtH"
      ? filteredProductsByRating.sort((a, b) => a.price - b.price)
      : filteredProductsByRating.sort((a, b) => b.price - a.price)
    : filteredProductsByRating;

  const getFinalData = (filteredProducts, priceRange) => {
    const res = filteredProducts.filter(
      ({ price }) => Number(price) > 0 && Number(price) < Number(priceRange)
    );
    return res;
  };

  const finalData = getFinalData(filteredProductsByPrice, priceRange);

  const finalProducts = search
    ? finalData.filter((product) =>
        product.color.toLowerCase().includes(search.toLowerCase())
      )
    : [...finalData];

  // const finalProducts = search ? finalData.filter(product=>product.color.toLowerCase()=== search.toLowerCase()) : [...finalData]

  //---------------------------------------------------------
  return (
    <>
      {loader && <Loader />}
      <div className="filter-btn-div">
        <button className="filter-btn" onClick={() => setDrawer(!drawer)}>
          Filter
        </button>
      </div>
      <div className="product-container">
        <ProductsFilter />

        <div className="product-list-container">
          <div className="product-list-header">
            {finalProducts.length > 0 ? (
              <>
                <h2>Total Products</h2>
                <p>({finalProducts.length} products)</p>
              </>
            ) : (
              <p>No Products to show</p>
            )}
          </div>
          <div className="product-card">
            {finalProducts.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
