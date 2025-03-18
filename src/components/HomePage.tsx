import "./HomePage.css";
import { WordRotateDemo } from "./TextEffect/TextEffect";

const HomePage = () => {
  return (
    <div className="right-container hero">
      <div className="hero-overlay">
        {/*         <iframe src="https://lottie.host/embed/cb81540f-27a9-4760-9f6f-4d8bcdf1db22/xF3e7TZMTD.lottie"></iframe>*/}
        <iframe src="https://lottie.host/embed/a9274d37-d6aa-4973-96ff-8225d9291108/iHmxkNmuoj.lottie"></iframe>
        {/* https://lottiefiles.com/search?q=file+uploader&category=animations&page=2 */}
      </div>
      <div className="home">
        <div className="normal-text">Now Uploading Files becomes</div>
        <div className="magic-text">
          <WordRotateDemo></WordRotateDemo>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
