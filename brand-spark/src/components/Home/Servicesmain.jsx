import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import { useEffect, useState } from 'react';
import { axiosAdmin } from '../../axios/axiosAdmin';

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const Servicesmain = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const response = await axiosAdmin().get('/getService');
      setServices(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main flex justify-center gap-10 items-center">
      <div className="left-ser">
        <motion.h1
          className="service text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          Our <br /> <span>Services</span>
        </motion.h1>
        <motion.img
          src="/elements/arrow.png"
          alt=""
          className="img"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      </div>

      <div className="right-ser flex flex-col">
        <div className="first-off flex">
          {services.slice(0,4).map((service, index) => (
            <motion.div
              key={index}
              className="box"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              <img src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${service.iconUrl}`} alt={`${service.title} Image`} />
              <h4>{service.title}</h4>
            </motion.div>
          ))}
        </div>

        <div className="second-off flex">
          {services.slice(4).map((service, index) => (
            <motion.div
              key={index}
              className="box"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              transition={{
                duration: 0.6,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
            >
              <img src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${service.iconUrl}`} alt={`${service.title} Image`} />
              <h4>{service.title}</h4>
            </motion.div>
          ))}
        </div>

        {/* Styled Button */}
        <motion.button
          className="explore-more"
          onClick={() => navigate('/services')}
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
