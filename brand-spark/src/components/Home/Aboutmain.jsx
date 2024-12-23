import video from "/video.mp4";
import "./Aboutmain.css";

const Aboutmain = () => {
  return (
    <div className="main-about">
      <video className="video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Aboutmain;
