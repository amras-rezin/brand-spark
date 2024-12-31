import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { axiosAdmin } from '../../axios/axiosAdmin';
import "./OurWorks.css";

const BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_S3_REGION;

const OurWorks = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [projects, setProjects] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true); // Loading state for modal image

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axiosAdmin().get('/portfolioManagement');
      setProjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    setLoadingImage(true); // Set loading state to true when opening the modal
    setModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setModalOpen(false), 300); 
  };

  const handleImageLoad = () => {
    setLoadingImage(false); // Set loading state to false when image is loaded
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <>
      <div className="works">
        <motion.div
          className="heading-work"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1>Our Finished Projects</h1>
        </motion.div>

        <motion.div
          className="projects-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-box"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              onClick={() => openModal(project.detailsImageUrl)}
              style={{ cursor: "pointer" }}
            >
              <div className="image-container">
                <img src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${project.coverImageUrl}`} alt={`Project ${project.id}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {isModalOpen && (
        <motion.div
          className="modal-overlay"
          onClick={closeModal}
          initial="hidden"
          animate={isClosing ? "exit" : "visible"}
          variants={modalVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <motion.div
            className="modal-content relative bg-white p-4 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()} 
            variants={modalVariants}
            initial="hidden"
            animate={isClosing ? "exit" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              overflowY: "auto",
            }}
          >
            {/* Show loading spinner or placeholder while the image is loading */}
            {loadingImage && <div className="spinner">Loading...</div>}

            <img
              src={`https://${BUCKET}.s3.${REGION}.amazonaws.com/${modalImage}`}
              alt="Project Modal"
              className="w-full h-auto object-contain"
              onLoad={handleImageLoad} // Trigger when image has loaded
              style={loadingImage ? { display: 'none' } : {}}
            />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default OurWorks;
