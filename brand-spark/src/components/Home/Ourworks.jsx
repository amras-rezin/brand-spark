import { motion } from "framer-motion";
import "./OurWorks.css";
import Image1 from "/project2.jpg";
import Image2 from "/project3.jpg";
import Image3 from "/project4.jpg";
import Image4 from "/project5.jpg";

const OurWorks = () => {
  const works = [
    {
      id: 1,
      imgSrc: Image1, // Use imported path
    },
    {
      id: 2,
      imgSrc: Image2,
    },
    {
      id: 3,
      imgSrc: Image3,
    },
    {
      id: 4,
      imgSrc: Image4,
    },
  ];

  return (
    <motion.section
      className="our-works"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <h2>OUR WORKS</h2>
      <motion.div className="works-container">
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            className="work-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <img src={work.imgSrc} alt={`Work ${work.id}`} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default OurWorks;
