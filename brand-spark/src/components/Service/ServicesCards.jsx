import { motion } from 'framer-motion';
import './ServicesCards.css';
import { useEffect, useState } from 'react';
import { axiosAdmin } from '../../axios/axiosAdmin';
import { FaSpinner } from 'react-icons/fa';

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const ServicesCards = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await axiosAdmin().get('/getService');
      setServices(response.data);
      setLoading(false); // Stop loading once data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  return (
    <div className="main-service">
      {/* Animated heading */}
      <motion.div
        className="head-service"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
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
          ease: 'easeInOut',
          delay: 0.3,
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {loading
          ? 
          <div className='min-h-screen'><FaSpinner className='animate-spin'/></div>
          
          : services.map((service, index) => (
              <div className="boxes" key={index}>
                <div className="left">
                  <img
                    src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${service.iconUrl}`}
                    alt={`${service.title} Image`}
                  />
                </div>
                <div className="right">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
      </motion.div>
    </div>
  );
};

export default ServicesCards;
