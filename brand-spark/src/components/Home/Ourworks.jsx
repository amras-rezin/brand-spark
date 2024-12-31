import { motion } from 'framer-motion';
import './OurWorks.css';

import { useEffect, useState } from 'react';
import { axiosAdmin } from '../../axios/axiosAdmin';
import { Link } from 'react-router-dom';

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const OurWorks = () => {
  const [works, setWorks] = useState([])
  useEffect(() => {
    fetchPortfolio();
  }, []);
  const fetchPortfolio = async () => {
    try {
      const response = await axiosAdmin().get('/portfolioManagement');
      setWorks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const works = [
  //   {
  //     id: 1,
  //     imgSrc: Image1, // Use imported path
  //   },
  //   {
  //     id: 2,
  //     imgSrc: Image2,
  //   },
  //   {
  //     id: 3,
  //     imgSrc: Image3,
  //   },
  //   {
  //     id: 4,
  //     imgSrc: Image4,
  //   },
  // ];

  return (
    <motion.section
      className="our-works"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <h2>Our Works</h2>
      <motion.div className="works-container">
        {works.slice(0,4).map((work, index) => (
          <motion.div
            key={work.id}
            className="work-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          >
            <Link to={'/portfolio'}><img src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${work.coverImageUrl}`} alt={`Work ${work._id}`} /></Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default OurWorks;
