import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Services.css";

const Servicesmain = () => {
  const navigate = useNavigate();

  return (
    <div className="main flex justify-center gap-10 items-center">
      <div className="left-ser">
        <motion.h1
          className="service text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          Our <br /> <span>Services</span>
        </motion.h1>
        <motion.img
          src="/elements/arrow.png"
          alt=""
          className="img"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </div>

      <div className="right-ser flex flex-col">
        <div className="first-off flex">
          {["grid1", "grid2", "grid3", "grid4"].map((grid, index) => (
            <motion.div
              key={index}
              className="box"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <img src={`/elements/${grid}.png`} alt="" />
              <h4>Heading</h4>
            </motion.div>
          ))}
        </div>

        <div className="second-off flex">
          {["grid5", "grid8", "grid6", "grid7"].map((grid, index) => (
            <motion.div
              key={index}
              className="box"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <img src={`/elements/${grid}.png`} alt="" />
              <h4>Heading</h4>
            </motion.div>
          ))}
        </div>

        {/* Styled Button */}
        <motion.button
          className="explore-more"
          onClick={() => navigate("/services")}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.98 }} 
        >
          Explore More
        </motion.button>
      </div>
    </div>
  );
};

export default Servicesmain;
