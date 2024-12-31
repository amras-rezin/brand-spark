import { motion } from "framer-motion";
import "./Clients.css";
import { useEffect, useState } from "react";
import { axiosAdmin } from "../../axios/axiosAdmin";

const Clients = () => {
  const [clientData, setClientData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
      const fetchClients = async () => {
        try {
          const response = await axiosAdmin().get("/clients");
          setClientData(response.data);
          console.log("Client Data:", response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching clients:", err);
          setError("Failed to load clients.");
          setLoading(false);
        }
      };
  
      fetchClients();
    }, []);

  const blueLogos = [...Array(7)].map((_, i) => `/icons/BLUE${i + 1}.png`);
  const whiteLogos = [...Array(7)].map((_, i) => `/icons/white${i+1}.png`);
  const topBrandLogo = "/icons/sparkBlue.png"; 
  const bottomBrandLogo = "/icons/sparkWhite.png"; 

  const createRow = (logos, keyPrefix, brandLogo) => {
    return Array(3)
      .fill(logos)
      .flatMap((logosBatch, dupIndex) =>
        logosBatch.flatMap((logo, i) => [
          <img
            key={`${keyPrefix}-${dupIndex}-${i}`}
            className="client-icon"
            src={logo}
            alt={`${keyPrefix}-${i}`}
          />,
          <img
            key={`${keyPrefix}-brand-${dupIndex}-${i}`}
            className="client-icon brand-logo"
            src={brandLogo}
            alt={`${keyPrefix}-brand`}
          />,
        ])
      );
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
