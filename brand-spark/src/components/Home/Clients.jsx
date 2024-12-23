import { motion } from "framer-motion";
import "./Clients.css";

const Clients = () => {
  const blueLogos = [...Array(7)].map((_, i) => `/icons/BLUE${i + 1}.png`);
  const whiteLogos = [...Array(7)].map((_, i) => `/icons/white${i+1}.png`);
  const topBrandLogo = "/icons/sparkBlue.png"; 
  const bottomBrandLogo = "/icons/sparkWhite.png"; 

  const createRow = (logos, keyPrefix, brandLogo) => {
    const logosWithBrand = logos.flatMap((logo, i) => [
      <img key={`${keyPrefix}-${i}`} className="client-icon" src={logo} alt={`${keyPrefix}-${i}`} />,
      <img key={`${keyPrefix}-brand-${i}`} className="client-icon" src={brandLogo} alt={`${keyPrefix}-brand`} />,
    ]);

    // Duplicate logos multiple times for seamless scrolling
    return [...logosWithBrand, ...logosWithBrand, ...logosWithBrand];
  };

  return (
    <motion.div
      className="main-client flex justify-center items-center flex-col gap-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    >
      <div className="w-[100%] bg-white h-auto py-1">
        <div className="top-row">
        {createRow(blueLogos, "top", topBrandLogo)}
        </div>
      </div>
      <div className="w-[100%] bg-customBlue h-auto py-1">
        <div className="bottom-row justify-end">
          {/* Reverse whiteLogos here */}
          {createRow(whiteLogos.reverse(), "bottom", bottomBrandLogo)}
        </div>
      </div>
    </motion.div>
  );
};

export default Clients;
