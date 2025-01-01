// Steps.js
import {motion} from 'framer-motion'
import "./Steps.css";

const Steps = () => {
  return (
    <div className="steps-container">
      <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
        3 Steps to <br />
        Partner with Us
      </motion.h1>
      
      <motion.div
      className="card-steps"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
        <div className="card-step" id="card-step1">
          <img src="/elements/ser2.png" width="100" />
          <h3>Consultation</h3>
          <p>Define your vision and set clear goals with our experts.</p>
        </div>
        <div className="card-step">
          <img src="/elements/ser1.png" width="140" />
          <h3>Design & Development</h3>
          <p>Craft visually compelling, strategically effective solutions.</p>
        </div>
        <div className="card-step" id="card-step2">
          <img src="/elements/ser3.png" width="100" />
          <h3>Review & Launch</h3>
          <p>Refine together and launch with impact, making it more premium.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Steps;
