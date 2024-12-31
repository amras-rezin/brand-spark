import { motion } from "framer-motion";
import "./Clients.css";
import { useEffect, useState } from "react";
import { axiosAdmin } from "../../axios/axiosAdmin";

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const Clients = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await axiosAdmin().get("/clients");
        setClientData(response.data);
        console.log("Client Data:", response.data);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load clients. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchClients();
  }, []);

  let blues = [];
  let whites = [];
  if (clientData.length > 0) {
    blues = clientData.filter((client) => client.color === "Blue");
    whites = clientData.filter((client) => client.color === "White");
  }

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
            src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${logo.clientUrl}`}
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

  if (loading) {
    return (
      <div className="loading-container flex justify-center items-center h-screen">
        <p>Loading clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container flex justify-center items-center h-screen">
        <p className="error-message text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="main-client flex justify-center items-center flex-col gap-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
    >
      <div className="w-[100%] bg-white h-auto py-1">
        <div className="top-row">{createRow(blues, "top", topBrandLogo)}</div>
      </div>
      <div className="w-[100%] bg-customBlue h-auto py-1">
        <div className="bottom-row justify-end">
          {/* Reverse white logos here */}
          {createRow(whites.reverse(), "bottom", bottomBrandLogo)}
        </div>
      </div>
    </motion.div>
  );
};

export default Clients;