import "../../public/logo.svg";
import "./HomePage.css";
import { WordRotateDemo } from "./TextEffect/TextEffect";

const HomePage = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-overlay">
            <img src="../../public/logo.svg" alt="logo" />
        </div>
        <div className="home">
          <div className="normal-text">Now Uploading Files becomes</div>
          <div className="magic-text">
            <WordRotateDemo></WordRotateDemo>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
