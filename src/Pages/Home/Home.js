import "./Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { useData } from "../../contexts/DataContext";
import Loader from "../../Components/Loader/Loader";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const { products, categories, dispatch, loader, setLoader } = useData();

  const categoryClickHandler = (categoryName) => {
    const val = categoryName;
    const isChecked = true;
    dispatch({
      type: "CHANGE_CATEGORY",
      payload: { val, isChecked },
    });
    navigate("/product");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
    dispatch({
      type: "CLEAR",
      payload: products,
    });
  }, [dispatch, products, setLoader]);

  return (
    <>
      <div className="home-container">
        {loader && <Loader />}
        <div className="heading">
          <h2>Welcome To Shoe Plaza</h2>
        </div>

        <Carousel dynamicHeight autoPlay interval="1400" transitionTime="800">
          <div
            className="bg-img-container carousel-1"
            onClick={() => navigate("/product")}
          >
            <button className="home-btn">Shop Now</button>
          </div>
          <div
            className="bg-img-container carousel-2"
            onClick={() => navigate("/product")}
          >
            <button className="home-btn">Shop Now</button>
          </div>
          <div
            className="bg-img-container carousel-3"
            onClick={() => navigate("/product")}
          >
            <button className="home-btn">Shop Now</button>
          </div>
        </Carousel>

        <div className="home-page-text">
          <div className="heading para">
            <h2>Find The Below Categories</h2>
          </div>
        </div>

        <div className="category-container">
          {categories &&
            categories.map(({ _id, categoryName, img }) => (
              <div
                key={_id}
                className="category"
                onClick={() => categoryClickHandler(categoryName)}
              >
                <div className="category-image">
                  <img src={img} alt={categoryName}></img>
                </div>
                <div className="category-name">
                  <p>{categoryName}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
