import {motion} from 'framer-motion';
import "./Clients.css";

const Clients = () => {
  return (
    <motion.div
    className="main-client flex justify-center items-center flex-col gap-10"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
  >
      <div className="top-row">
        {[...Array(10)].map((_, i) => (
          <img
            key={`top-${i}`}
            className="client-icon"
            src={`/icons/${i + 1}.png`}
            alt={`client-${i + 1}`}
          />
        ))}
        {/* Duplicate the images for seamless scrolling */}
        {[...Array(10)].map((_, i) => (
          <img
            key={`top-dup-${i}`}
            className="client-icon"
            src={`/icons/${i + 1}.png`}
            alt={`client-${i + 1}`}
          />
        ))}
      </div>
      <div className="bottom-row">
        {[...Array(10)].map((_, i) => (
          <img
            key={`bottom-${i}`}
            className="client-icon"
            src={`/icons/${10 - i}.png`}
            alt={`client-${10 - i}`}
          />
        ))}
        {/* Duplicate the images for seamless scrolling */}
        {[...Array(10)].map((_, i) => (
          <img
            key={`bottom-dup-${i}`}
            className="client-icon"
            src={`/icons/${10 - i}.png`}
            alt={`client-${10 - i}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Clients;
