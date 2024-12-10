import { motion } from "framer-motion";
import "./Call.css";

const Call = () => {
  return (
    <motion.div
      className="call bg-black flex justify-center flex-col items-center py-4 px-4"
      initial={{ opacity: 0, y: 50 }} // Starting state: off-screen
      whileInView={{ opacity: 1, y: 0 }} // Animate into view when in viewport
      viewport={{ once: true }} // Trigger animation only once
      transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth transition
    >
      {/* Animated text */}
      <motion.p
        className="text-white pt-4 text-justify"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
      >
        Transform your ideas into reality to get impactful and unforgettable branding solutions
      </motion.p>

      {/* Animated buttons */}
      <motion.div
        className="btns flex gap-8 py-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
      >
        <a
          href="#"
          className="call-btn text-white px-7 py-1 rounded-md transform transition-transform duration-300 hover:scale-110"
        >
          Schedule a Call
        </a>
        <a
          href="#"
          className="border-2 border-white text-white px-7 py-1 rounded-md transform transition-transform duration-300 hover:scale-110"
        >
          Our Work
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Call;
