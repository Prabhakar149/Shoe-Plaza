import "./Loader.css";
import loader from "../../assets/Spinner.svg";

const Loader = () => {
  return (
    <div className="loader-div">
      <img src={loader} className="loader" alt="loader"></img>;
    </div>
  );
};

export default Loader;
