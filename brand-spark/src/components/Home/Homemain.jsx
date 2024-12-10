import video from "/video.mp4";
import { motion } from "framer-motion";
import "./Home.css";

const Homemain = () => {
  return (
    <motion.div
      className="home-div w-full flex justify-center items-center"
      initial={{ opacity: 0, y: 50 }} // Start off-screen and transparent
      animate={{ opacity: 1, y: 0 }} // Slide up into view
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
    >
      <video className="video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </motion.div>
  );
};

export default Homemain;
