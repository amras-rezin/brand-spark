
import { motion } from "framer-motion";
import "./ServicesCards.css";
import { useEffect } from "react";

const ServicesCards = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="main-service">
      {/* Animated heading */}
      <motion.div
        className="head-service"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1>Our Services</h1>
      </motion.div>

      {/* Animated card boxes */}
      <motion.div
        className="card-boxes"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          delay: 0.3, // Delay for smooth sequential animation
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid1.png" alt="" />
          </div>
          <div className="right">
            <h2>Title Animation</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        {/* Repeat for other boxes */}
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid2.png" alt="" />
          </div>
          <div className="right">
            <h2>3D Animation</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        {/* Continue with other services as per the original code */}
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid3.png" alt="" />
          </div>
          <div className="right">
            <h2>SMM</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid4.png" alt="" />
          </div>
          <div className="right">
            <h2>Digital Marketing</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid5.png" alt="" />
          </div>
          <div className="right">
            <h2>Graphic Design</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid6.png" alt="" />
          </div>
          <div className="right">
            <h2>UI/UX Design</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid7.png" alt="" />
          </div>
          <div className="right">
            <h2>Motion Graphics</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
        <div className="boxes">
          <div className="left">
            <img src="./elements/grid8.png" alt="" />
          </div>
          <div className="right">
            <h2>CGI Ad</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Aspernatur nihil in quisquam, itaque adipisci cupiditate eaque
              debitis ullam accusamus assumenda sequi officiis perferendis
              deserunt temporibus.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesCards;
