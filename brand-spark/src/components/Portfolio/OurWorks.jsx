
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import "./OurWorks.css";

const OurWorks = () => {
  return (
    <div className="works">
      {/* Animated heading */}
      <motion.div
        className="heading-work"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h1>Our Finished Projects</h1>
      </motion.div>

      {/* Animated project containers */}
      <motion.div
        className="projects-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Project box 1 */}
        <motion.div
          className="project-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="image-container">
            <img src="./project1.jpg" alt="Project 1" />
          </div>
          <a href="#" className="view-case">
            View Case <FaArrowRight />
          </a>
        </motion.div>

        {/* Project box 2 */}
        <motion.div
          className="project-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="image-container">
            <img src="./project2.jpg" alt="Project 2" />
          </div>
          <a href="#" className="view-case">
            View Case <FaArrowRight />
          </a>
        </motion.div>

        {/* Project box 3 */}
        <motion.div
          className="project-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="image-container">
            <img src="./project2.jpg" alt="Project 2" />
          </div>
          <a href="#" className="view-case">
            View Case <FaArrowRight />
          </a>
        </motion.div>

        {/* Project box 4 */}
        <motion.div
          className="project-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="image-container">
            <img src="./project1.jpg" alt="Project 1" />
          </div>
          <a href="#" className="view-case">
            View Case <FaArrowRight />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OurWorks;
