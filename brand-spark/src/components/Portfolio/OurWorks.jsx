import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./OurWorks.css";

const OurWorks = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setModalOpen(false), 300); // Wait for the closing animation to finish
  };

  useEffect(() => {
    if (isModalOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Allow background scrolling
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Project data
  const projects = [
    { id: 1, thumbnail: "./project1.png", modalImage: "./boschWork.jpeg" },
    { id: 2, thumbnail: "./project2.png", modalImage: "./boschWork.jpeg" },
    { id: 3, thumbnail: "./project3.png", modalImage: "./boschWork.jpeg" },
    { id: 4, thumbnail: "./project4.png", modalImage: "./boschWork.jpeg" },
  ];

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <>
      <div className="works">
        {/* Animated heading */}
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

        {/* Animated project containers */}
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
          {/* Project boxes */}
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
              onClick={() => openModal(project.modalImage)}
              style={{ cursor: "pointer" }}
            >
              <div className="image-container">
                <img src={project.thumbnail} alt={`Project ${project.id}`} />
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
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
            <img
              src={modalImage}
              alt="Project Modal"
              className="w-full h-auto object-contain"
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
