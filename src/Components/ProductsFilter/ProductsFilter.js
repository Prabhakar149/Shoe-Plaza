import "./ProductsFilter.css";
import { useData } from "../../contexts/DataContext";

const rating = [4, 3, 2, 1];

const ProductsFilter = () => {
  const {
    products,
    categories,
    priceRange,
    selectedCategory,
    sortByRating,
    sortByPrice,
    dispatch,
    drawer,
    setDrawer,
  } = useData();

  const priceRangeHandler = (e) => {
    dispatch({
      type: "PRICE_RANGE",
      payload: e.target.value,
    });
  };
  const categoryChangeHandler = (e) => {
    const val = e.target.value;
    const isChecked = e.target.checked;
    dispatch({
      type: "CHANGE_CATEGORY",
      payload: { val, isChecked },
    });
  };
  const sortByRatingChangeHandler = (e) => {
    dispatch({
      type: "SORT_BY_RATING",
      payload: e.target.value,
    });
  };
  const sortByPriceChangeHandler = (e) => {
    dispatch({
      type: "SORT_BY_PRICE",
      payload: e.target.value,
    });
  };
  const clearBtnHandle = () => {
    dispatch({
      type: "CLEAR",
      payload: products,
    });
    setDrawer(!drawer);
  };
  

  return (
    <div className={`filter-container ${drawer ? "drawer-on" : "drawer-off"}`}>
      <div className="filter-heading">
        <h4>Filters</h4>
        <p onClick={clearBtnHandle}>Clear</p>
      </div>

      <div className="filter-price">
        <h4>Price</h4>
        <div className="filter-slider-range">
          <div className="filter-range">
            <p>500</p>
            <p>1000</p>
            <p>1500</p>
          </div>
          <input
            type="range"
            name="rangeInput"
            className="slider"
            min="500"
            max="1500"
            value={priceRange}
            onChange={priceRangeHandler}
          />
        </div>
      </div>

      <div className="category-filter">
        <h4>Category</h4>
        {categories.length > 0 && (
          <div>
            {categories.map(({ categoryName, _id }) => (
              <div className="checkbox-filters" key={_id}>
                <input
                  type="checkbox"
                  value={categoryName}
                  onChange={categoryChangeHandler}
                  checked={
                    selectedCategory.includes(categoryName) ? true : false
                  }
                ></input>
                <span>{categoryName}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rating-filter">
        <h4>Rating</h4>
        <div>
          {rating.map((num, index) => (
            <div key={index} className="rating-radio-filters">
              <input
                type="radio"
                value={num}
                name="input-radio-rating"
                onChange={sortByRatingChangeHandler}
                checked={Number(sortByRating) === num ? true : false}
              ></input>
              <span>{num} stars & above</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sort-price-filter">
        <h4>Sort by Price</h4>
        <div>
          <div className="sort-price-radio-filters">
            <input
              type="radio"
              value="LtH"
              name="input-radio-price"
              onChange={sortByPriceChangeHandler}
              checked={sortByPrice === 'LtH' ? true : false}
            ></input>
            <span>Low to High</span>
          </div>
          <div className="sort-price-radio-filters">
            <input
              type="radio"
              value="HtL"
              name="input-radio-price"
              onChange={sortByPriceChangeHandler}
              checked={sortByPrice === 'HtL' ? true : false}
            ></input>
            <span>High to Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
